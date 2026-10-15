// The back of a Blood of Icetear card: frost and ember around the logo.
//
// Built the same way as the fronts, so the shape, the corner radius and the
// border weight all match: a painted SVG ground with the logo composited on
// top, then masked to the card's rounded rectangle.
import sharp from 'sharp';

const W = 1134, H = Math.round(W * 528 / 378);
const R = W * 0.036;
const CX = W / 2, CY = H / 2;

// A ring of ice spikes behind the logo, drawn rather than painted so it stays
// crisp at any size. Each spike is a long thin kite.
function spikes(n, r0, r1, wide, opacity) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const s = (i % 3 === 0) ? 1 : (i % 3 === 1 ? 0.62 : 0.8);   // uneven, like frost
    const r2 = r0 + (r1 - r0) * s;
    const p = (rad, ang) => `${(CX + Math.cos(ang) * rad).toFixed(1)} ${(CY + Math.sin(ang) * rad).toFixed(1)}`;
    out.push(`<path d="M ${p(r0, a)} L ${p(r0 + (r2 - r0) * 0.45, a - wide)} L ${p(r2, a)} L ${p(r0 + (r2 - r0) * 0.45, a + wide)} Z"
      fill="url(#icegrad)" opacity="${(opacity * (0.55 + 0.45 * s)).toFixed(3)}"/>`);
  }
  return out.join('\n    ');
}

// Hairline cracks running out of the centre, the way ice splits.
function cracks(n, r0, r1, seed = 7) {
  let s = seed;
  const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const out = [];
  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2 + rnd() * 0.3;
    let r = r0;
    let d = `M ${(CX + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`;
    while (r < r1) {
      r += (r1 - r0) * (0.12 + rnd() * 0.14);
      a += (rnd() - 0.5) * 0.28;
      d += ` L ${(CX + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`;
    }
    out.push(`<path d="${d}" fill="none" stroke="#bcd8ea" stroke-opacity="${(0.028 + rnd() * 0.045).toFixed(3)}"
      stroke-width="${(W * 0.0012 * (0.6 + rnd())).toFixed(2)}" stroke-linecap="round"/>`);
  }
  return out.join('\n    ');
}

const inset1 = W * 0.030, inset2 = W * 0.052;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="ground" cx=".5" cy=".46" r=".78">
      <stop offset="0" stop-color="#1b2027"/>
      <stop offset=".55" stop-color="#0e1115"/>
      <stop offset="1" stop-color="#050608"/>
    </radialGradient>
    <radialGradient id="frost" cx=".5" cy=".16" r=".62">
      <stop offset="0" stop-color="#5f9fc9" stop-opacity=".30"/>
      <stop offset="1" stop-color="#5f9fc9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ember" cx=".5" cy=".9" r=".66">
      <stop offset="0" stop-color="#8e2318" stop-opacity=".30"/>
      <stop offset="1" stop-color="#8e2318" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#9fd4ef" stop-opacity=".16"/>
      <stop offset=".7" stop-color="#9fd4ef" stop-opacity=".03"/>
      <stop offset="1" stop-color="#9fd4ef" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="icegrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfe6f4" stop-opacity=".55"/>
      <stop offset="1" stop-color="#4d7f9e" stop-opacity=".12"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7d8a93"/>
      <stop offset=".45" stop-color="#cfd8dd"/>
      <stop offset=".55" stop-color="#8d6248"/>
      <stop offset="1" stop-color="#6b4030"/>
    </linearGradient>
    <linearGradient id="tear" x1=".3" y1="0" x2=".7" y2="1">
      <stop offset="0" stop-color="#eaf6ff" stop-opacity=".92"/>
      <stop offset=".55" stop-color="#9fc8e0" stop-opacity=".65"/>
      <stop offset="1" stop-color="#3f6d8c" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="fadeL" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#cfe6f4" stop-opacity="0"/>
      <stop offset="1" stop-color="#cfe6f4" stop-opacity=".45"/>
    </linearGradient>
    <linearGradient id="fadeR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#cfe6f4" stop-opacity=".45"/>
      <stop offset="1" stop-color="#cfe6f4" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${W * 0.006}"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  <rect width="${W}" height="${H}" fill="url(#frost)"/>
  <rect width="${W}" height="${H}" fill="url(#ember)"/>

  <!-- the sigil behind the logo -->
  <g filter="url(#soft)" opacity=".9">
    ${spikes(24, W * 0.215, W * 0.455, 0.052, 0.5)}
  </g>
  ${spikes(24, W * 0.20, W * 0.40, 0.030, 0.42)}
  <circle cx="${CX}" cy="${CY}" r="${W * 0.355}" fill="url(#halo)"/>
  <circle cx="${CX}" cy="${CY}" r="${W * 0.207}" fill="none"
          stroke="#cfe6f4" stroke-opacity=".20" stroke-width="${W * 0.0022}"/>
  <circle cx="${CX}" cy="${CY}" r="${W * 0.190}" fill="none"
          stroke="#cfe6f4" stroke-opacity=".09" stroke-width="${W * 0.0012}"/>
  <circle cx="${CX}" cy="${CY}" r="${W * 0.405}" fill="none"
          stroke="#8d6248" stroke-opacity=".22" stroke-width="${W * 0.0016}"/>
  ${cracks(26, W * 0.21, W * 0.60)}

  <!-- border -->
  <rect x="${inset1}" y="${inset1}" width="${W - 2 * inset1}" height="${H - 2 * inset1}"
        rx="${R * 0.72}" fill="none" stroke="url(#rule)" stroke-opacity=".75"
        stroke-width="${W * 0.0042}"/>
  <rect x="${inset2}" y="${inset2}" width="${W - 2 * inset2}" height="${H - 2 * inset2}"
        rx="${R * 0.52}" fill="none" stroke="#cfe6f4" stroke-opacity=".16"
        stroke-width="${W * 0.0013}"/>

  <!-- corner marks -->
  ${[[inset2, inset2, 1, 1], [W - inset2, inset2, -1, 1],
     [inset2, H - inset2, 1, -1], [W - inset2, H - inset2, -1, -1]]
    .map(([x, y, sx, sy]) => `<path d="M ${x} ${y + sy * W * 0.052} L ${x} ${y} L ${x + sx * W * 0.052} ${y}"
        fill="none" stroke="#cfe6f4" stroke-opacity=".40" stroke-width="${W * 0.0030}" stroke-linecap="square"/>`)
    .join('\n  ')}

  <!-- the icetear itself, below the logo: a frozen tear on a hairline rule
       that tapers away to nothing at both ends -->
  <g transform="translate(${CX} ${CY + H * 0.175})">
    <path d="M 0 ${-W * 0.040} C ${W * 0.026} ${-W * 0.006} ${W * 0.024} ${W * 0.026} 0 ${W * 0.030}
             C ${-W * 0.024} ${W * 0.026} ${-W * 0.026} ${-W * 0.006} 0 ${-W * 0.040} Z"
          fill="url(#tear)" stroke="#dcefff" stroke-opacity=".45" stroke-width="${W * 0.0016}"/>
    <path d="M 0 ${-W * 0.026} C ${W * 0.012} ${-W * 0.008} ${W * 0.011} ${W * 0.010} 0 ${W * 0.014}"
          fill="none" stroke="#ffffff" stroke-opacity=".32" stroke-width="${W * 0.0014}"/>
    <path d="M ${-W * 0.205} 0 L ${-W * 0.055} 0" stroke="url(#fadeL)" stroke-width="${W * 0.0016}"/>
    <path d="M ${W * 0.055} 0 L ${W * 0.205} 0" stroke="url(#fadeR)" stroke-width="${W * 0.0016}"/>
  </g>
</svg>`;

const vignette = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="v" cx=".5" cy=".5" r=".75">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".55"/>
  </radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/></svg>`;

const mask = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" rx="${R}" ry="${R}" fill="#fff"/></svg>`;

const logoW = Math.round(W * 0.80);
const logo = await sharp('public/cine/logo-2000.webp').resize({ width: logoW }).toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(Buffer.from(svg))
  .composite([
    { input: logo, left: Math.round((W - logoW) / 2), top: Math.round(CY - logoMeta.height / 2 - H * 0.035) },
    { input: Buffer.from(vignette) },
    { input: Buffer.from(mask), blend: 'dest-in' },
  ])
  .png()
  .toFile('docs/cards/card-back.png');

console.log('wrote cards/card-back.png');
