// Voice reshaping: a phase vocoder that moves pitch and vocal-tract resonance
// independently, so a changed voice still sounds like a person rather than a
// tape played at the wrong speed.
//
// Loaded on demand by the `voiceShift` engine in tools.js, because this is a
// few hundred lines of arithmetic that no other tool in the Workshop needs.
//
// The chain, per frame: analyse -> lift the spectral envelope out of the
// harmonics -> warp that envelope (the formants) -> propagate phases at a
// stretched hop -> overlap-add -> anti-alias -> resample. Pitch and formants
// come apart because the envelope is warped separately from the excitation it
// sits on, and the final resample scales both together by a known amount that
// the envelope warp is pre-divided by.

const N = 2048;      // analysis window: ~46ms at 44.1kHz, two periods of a low voice
const HOP = 512;     // 75% overlap
const HALF = N >> 1;

const fftCache = {};

/** Iterative radix-2 FFT over separate real and imaginary arrays, in place. */
function getFFT(n) {
  if (fftCache[n]) return fftCache[n];
  const levels = Math.round(Math.log2(n));
  const hc = new Float64Array(n >> 1);
  const hs = new Float64Array(n >> 1);
  for (let i = 0; i < (n >> 1); i++) {
    hc[i] = Math.cos(2 * Math.PI * i / n);
    hs[i] = Math.sin(2 * Math.PI * i / n);
  }
  const rev = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    let x = i, r = 0;
    for (let j = 0; j < levels; j++) { r = (r << 1) | (x & 1); x >>= 1; }
    rev[i] = r;
  }
  const f = (re, im, inverse) => {
    for (let i = 0; i < n; i++) {
      const j = rev[i];
      if (j > i) {
        let t = re[i]; re[i] = re[j]; re[j] = t;
        t = im[i]; im[i] = im[j]; im[j] = t;
      }
    }
    for (let size = 2; size <= n; size <<= 1) {
      const half = size >> 1, step = n / size;
      for (let i = 0; i < n; i += size) {
        for (let j = i, k = 0; j < i + half; j++, k += step) {
          const l = j + half, c = hc[k], s = inverse ? hs[k] : -hs[k];
          const tr = re[l] * c - im[l] * s;
          const ti = re[l] * s + im[l] * c;
          re[l] = re[j] - tr; im[l] = im[j] - ti;
          re[j] += tr; im[j] += ti;
        }
      }
    }
    if (inverse) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
  };
  fftCache[n] = f;
  return f;
}

function hann(n) {
  const w = new Float64Array(n);
  for (let i = 0; i < n; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / n);
  return w;
}

/** 4th-order Butterworth low-pass as two cascaded biquads, forward pass. */
function lowpass(buf, fs, fc) {
  for (const Q of [0.54119610, 1.30656296]) {
    const w0 = 2 * Math.PI * Math.min(fc, fs * 0.49) / fs;
    const cw = Math.cos(w0), al = Math.sin(w0) / (2 * Q);
    const a0 = 1 + al;
    const B0 = ((1 - cw) / 2) / a0, B1 = (1 - cw) / a0, B2 = B0;
    const A1 = (-2 * cw) / a0, A2 = (1 - al) / a0;
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < buf.length; i++) {
      const x = buf[i];
      const y = B0 * x + B1 * x1 + B2 * x2 - A1 * y1 - A2 * y2;
      x2 = x1; x1 = x; y2 = y1; y1 = y;
      buf[i] = y;
    }
  }
}

function cubic(b, pos) {
  const i = Math.floor(pos), f = pos - i, n = b.length;
  const p0 = (i - 1 >= 0 && i - 1 < n) ? b[i - 1] : 0;
  const p1 = (i >= 0 && i < n) ? b[i] : 0;
  const p2 = (i + 1 >= 0 && i + 1 < n) ? b[i + 1] : 0;
  const p3 = (i + 2 >= 0 && i + 2 < n) ? b[i + 2] : 0;
  return p1 + 0.5 * f * (p2 - p0 + f * (2 * p0 - 5 * p1 + 4 * p2 - p3 + f * (3 * (p1 - p2) + p3 - p0)));
}

/**
 * Reshape one channel.
 *
 * @param {Float32Array} x      input samples
 * @param {number} fs           sample rate
 * @param {object} p            pitch, formant, tilt, rate, breath, nasal,
 *                              resonance, throat (see VOICES below)
 * @param {function} [onProg]   called with 0..1
 * @returns {Promise<Float32Array>}
 */
export async function transform(x, fs, p, onProg) {
  const fft = getFFT(N), win = hann(N);
  const P = p.pitch, F = p.formant, R = p.rate || 1;
  const tiltDb = p.tilt || 0;
  const breath = p.breath || 0;
  const nasal = p.nasal || 0;
  const bias = p.throat || 0;
  const contrast = (p.resonance == null ? 1 : p.resonance);

  const S = P / R;      // synthesis stretch: pitch x P, duration / R
  const warp = F / P;   // in-vocoder envelope warp; the resample supplies the x P
  const doEnv = Math.abs(warp - 1) > 1e-4 || Math.abs(tiltDb) > 1e-4
    || Math.abs(nasal) > 1e-4 || Math.abs(contrast - 1) > 1e-4 || Math.abs(bias) > 1e-4;

  const nFrames = Math.max(1, Math.ceil(x.length / HOP) + 1);
  const outLen = Math.ceil(x.length * S) + 2 * N + 4;

  const out = new Float64Array(outLen), wsum = new Float64Array(outLen);
  const re = new Float64Array(N), im = new Float64Array(N);
  const cre = new Float64Array(N), cim = new Float64Array(N);
  const mag = new Float64Array(HALF + 1), ph = new Float64Array(HALF + 1);
  const prevPh = new Float64Array(HALF + 1), synPh = new Float64Array(HALF + 1);
  const outPh = new Float64Array(HALF + 1), envLog = new Float64Array(HALF + 1);
  const peakOf = new Int32Array(HALF + 1);

  // cepstral lifter cutoff: low enough to reject the harmonics, high enough to
  // keep the formants. fs/500 sits about a quarter of a low voice's period.
  const lift = Math.max(16, Math.min(150, Math.round(fs / 500)));
  const TAU = 2 * Math.PI;

  // tilt in dB per octave, hinged at 1 kHz, so overall loudness barely moves
  const tiltCurve = new Float64Array(HALF + 1);
  if (Math.abs(tiltDb) > 1e-4) {
    const s = tiltDb * (Math.LN10 / 20);
    for (let k = 0; k <= HALF; k++) tiltCurve[k] = s * Math.log2(Math.max(60, k * fs / N) / 1000);
  }

  // Where each output bin reads the envelope from. A real anatomical
  // difference is not a uniform multiply: chest and throat scale the low
  // resonances more than the mouth scales the high ones, so `throat` splits
  // the ratio across a soft knee at 1.5 kHz. bias 0 is the plain uniform warp.
  const srcIdx = new Float64Array(HALF + 1);
  {
    const wLo = warp * (1 + 0.25 * bias), wHi = warp * (1 - 0.25 * bias);
    for (let k = 0; k <= HALF; k++) {
      const f = k * fs / N;
      const t = 1 / (1 + Math.exp(-(f - 1500) / 600));
      srcIdx[k] = k / (wLo + (wHi - wLo) * t);
    }
  }

  // nasal colouring: a broad pole near 1 kHz against an antiformant near 700 Hz
  const nasalLog = new Float64Array(HALF + 1);
  if (Math.abs(nasal) > 1e-4) {
    const s = nasal * (Math.LN10 / 20);
    for (let k = 0; k <= HALF; k++) {
      const f = k * fs / N;
      nasalLog[k] = s * (6 * Math.exp(-Math.pow((f - 1000) / 340, 2))
        - 9 * Math.exp(-Math.pow((f - 700) / 240, 2)));
    }
  }

  // breathiness ramps in above 1.2 kHz, where the glottal noise floor lives
  const breathW = new Float64Array(HALF + 1);
  if (breath > 1e-4) {
    for (let k = 0; k <= HALF; k++) {
      const f = k * fs / N;
      breathW[k] = breath * Math.min(1, Math.max(0, (f - 1200) / 2600));
    }
  }

  let prevPos = 0, first = true;

  for (let m = 0; m < nFrames; m++) {
    const inPos = m * HOP;
    for (let i = 0; i < N; i++) {
      const s = inPos + i;
      re[i] = (s < x.length ? x[s] : 0) * win[i];
      im[i] = 0;
    }
    fft(re, im, false);
    for (let k = 0; k <= HALF; k++) {
      const a = re[k], b = im[k];
      mag[k] = Math.sqrt(a * a + b * b);
      ph[k] = Math.atan2(b, a);
    }

    if (doEnv) {
      for (let k = 0; k <= HALF; k++) cre[k] = Math.log(mag[k] + 1e-9);
      for (let k = HALF + 1; k < N; k++) cre[k] = cre[N - k];
      cim.fill(0);
      fft(cre, cim, true);                          // real cepstrum
      for (let i = lift; i <= N - lift; i++) cre[i] = 0;   // lifter: keep the envelope
      cim.fill(0);
      fft(cre, cim, false);                         // smoothed log magnitude
      for (let k = 0; k <= HALF; k++) envLog[k] = cre[k];

      let mean = 0;
      if (contrast !== 1) {
        for (let k = 0; k <= HALF; k++) mean += envLog[k];
        mean /= (HALF + 1);
      }
      for (let k = 0; k <= HALF; k++) {
        const src = srcIdx[k];
        let w;
        if (src <= 0) w = envLog[0];
        else if (src >= HALF) w = envLog[HALF];
        else { const i0 = src | 0, fr = src - i0; w = envLog[i0] + (envLog[i0 + 1] - envLog[i0]) * fr; }
        if (contrast !== 1) w = mean + contrast * (w - mean);   // formant sharpness
        let g = w - envLog[k] + tiltCurve[k] + nasalLog[k];
        if (g > 3.45) g = 3.45; else if (g < -3.45) g = -3.45;  // +/- 30 dB
        mag[k] *= Math.exp(g);
      }
    }

    // peak picking, so each harmonic's phase can be locked to its own peak
    let last = -1;
    for (let k = 0; k <= HALF; k++) {
      const l = k > 0 ? mag[k - 1] : -1, r = k < HALF ? mag[k + 1] : -1;
      if (mag[k] > l && mag[k] >= r && mag[k] > 1e-7) {
        if (last < 0) { for (let j = 0; j < k; j++) peakOf[j] = k; }
        else {
          const mid = (last + k) >> 1;
          for (let j = last + 1; j <= mid; j++) peakOf[j] = last;
          for (let j = mid + 1; j < k; j++) peakOf[j] = k;
        }
        peakOf[k] = k; last = k;
      }
    }
    if (last < 0) { for (let k = 0; k <= HALF; k++) peakOf[k] = k; }
    else for (let j = last + 1; j <= HALF; j++) peakOf[j] = last;

    const pos = Math.round(m * HOP * S);
    const hs = first ? HOP : (pos - prevPos);

    if (first) {
      for (let k = 0; k <= HALF; k++) outPh[k] = ph[k];
    } else {
      // peaks carry the true frequency forward
      for (let k = 0; k <= HALF; k++) {
        if (peakOf[k] === k) {
          const omega = TAU * k / N;
          let d = ph[k] - prevPh[k] - omega * HOP;
          d -= TAU * Math.round(d / TAU);
          outPh[k] = synPh[k] + (omega + d / HOP) * hs;
        }
      }
      // everything else keeps its phase relative to its peak, which is what
      // stops the result sounding smeared and metallic
      for (let k = 0; k <= HALF; k++) {
        const q = peakOf[k];
        if (q !== k) outPh[k] = outPh[q] + (ph[k] - ph[q]);
      }
    }
    for (let k = 0; k <= HALF; k++) { synPh[k] = outPh[k]; prevPh[k] = ph[k]; }
    first = false; prevPos = pos;

    // Breath decoheres the upper band for this frame only: the clean phases are
    // already stored in synPh, so the harmonic track never drifts. Randomising
    // phase at unchanged magnitude is what turns a tonal partial into noise,
    // which is what a leaky glottis does.
    for (let k = 0; k <= HALF; k++) {
      let o = outPh[k];
      if (breathW[k] > 0) o += (Math.random() * 2 - 1) * Math.PI * breathW[k];
      re[k] = mag[k] * Math.cos(o);
      im[k] = mag[k] * Math.sin(o);
    }
    for (let k = HALF + 1; k < N; k++) { re[k] = re[N - k]; im[k] = -im[N - k]; }
    im[0] = 0; im[HALF] = 0;
    fft(re, im, true);

    for (let i = 0; i < N; i++) {
      const o = pos + i;
      if (o < outLen) { const w = win[i]; out[o] += re[i] * w; wsum[o] += w * w; }
    }

    if ((m & 31) === 0) {
      if (onProg) onProg(m / nFrames);
      await new Promise((res) => setTimeout(res, 0));   // let the page breathe
    }
  }

  // dividing by the window sum is self-correcting, including at the edges
  const stretched = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) stretched[i] = wsum[i] > 1e-8 ? out[i] / wsum[i] : 0;

  // reading at a step above 1 decimates, so band-limit before resampling
  if (P > 1.02) lowpass(stretched, fs, 0.45 * fs / P);

  const y = new Float32Array(Math.max(1, Math.round(x.length / R)));
  for (let i = 0; i < y.length; i++) y[i] = cubic(stretched, i * P);

  // match the original peak, so A/B is a fair comparison and nothing clips
  let pIn = 0, pOut = 0;
  for (let i = 0; i < x.length; i++) { const a = Math.abs(x[i]); if (a > pIn) pIn = a; }
  for (let i = 0; i < y.length; i++) { const a = Math.abs(y[i]); if (a > pOut) pOut = a; }
  if (pOut > 1e-6) {
    const g = Math.min(pIn > 1e-6 ? pIn : 0.9, 0.99) / pOut;
    for (let i = 0; i < y.length; i++) y[i] *= g;
  }
  if (onProg) onProg(1);
  return y;
}

// ─── the voices ────────────────────────────────────────────────────────
//
// Each is one point in the eight dimensions above. `st` is pitch in
// semitones; `formant` is a ratio on vocal-tract length, inverted (1.14 means
// resonances 14% higher, as if the tract were shorter).

export const VOICES = {
  lighter:   { st: 2.6, formant: 1.14, tilt: 1.2, rate: 1.00, breath: 0.15, nasal: 0.00, resonance: 1.00, throat: 0.00 },
  deeper:    { st: -2.8, formant: 0.88, tilt: -1.0, rate: 1.00, breath: 0.00, nasal: 0.00, resonance: 1.05, throat: 0.15 },
  disguise:  { st: -4.6, formant: 1.09, tilt: -0.5, rate: 0.97, breath: 0.10, nasal: 0.00, resonance: 1.00, throat: -0.20 },
  child:     { st: 6.5, formant: 1.32, tilt: 1.6, rate: 1.06, breath: 0.20, nasal: 0.15, resonance: 0.95, throat: -0.15 },
  elder:     { st: -1.2, formant: 0.95, tilt: -0.8, rate: 0.90, breath: 0.45, nasal: 0.10, resonance: 0.85, throat: 0.00 },
  masculine: { st: -3.4, formant: 0.86, tilt: -0.9, rate: 0.96, breath: 0.00, nasal: 0.00, resonance: 1.10, throat: 0.20 },
  feminine:  { st: 3.6, formant: 1.18, tilt: 1.0, rate: 1.03, breath: 0.25, nasal: 0.00, resonance: 1.00, throat: -0.10 },
  herald:    { st: -1.5, formant: 0.94, tilt: -0.3, rate: 0.95, breath: 0.00, nasal: -0.15, resonance: 1.35, throat: 0.20 },
  confidant: { st: -0.5, formant: 1.00, tilt: 0.5, rate: 0.97, breath: 0.60, nasal: 0.00, resonance: 0.90, throat: 0.00 },
  giant:     { st: -7.5, formant: 0.76, tilt: -1.4, rate: 0.88, breath: 0.00, nasal: 0.00, resonance: 1.15, throat: 0.25 },
  troll:     { st: -5.5, formant: 0.80, tilt: -1.1, rate: 0.92, breath: 0.20, nasal: 0.45, resonance: 1.20, throat: 0.30 },
  wraith:    { st: -3.5, formant: 1.22, tilt: 0.6, rate: 1.08, breath: 0.55, nasal: 0.25, resonance: 0.80, throat: -0.30 },
};

/** Turn a voice name into the parameters `transform` wants. */
export function voiceParams(name) {
  const v = VOICES[name] || VOICES.deeper;
  return {
    pitch: Math.pow(2, v.st / 12),
    formant: v.formant,
    tilt: v.tilt,
    rate: v.rate,
    breath: v.breath,
    nasal: v.nasal,
    resonance: v.resonance,
    throat: v.throat,
  };
}
