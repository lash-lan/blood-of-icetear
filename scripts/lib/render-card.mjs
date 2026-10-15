// Render a finished card as a PNG, using the same design as the site's
// collection page. The art is composited underneath an SVG of the frame, so
// the proportions follow the CSS: every size is a share of the card width.
//
//   node render-card.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const W = 1134, H = Math.round(W * 528 / 378);   // the card's 378:528 shape
const EM = W * 0.048;                            // .tok-frame font-size: 4.8cqw
const PAD = 0.5 * EM;                            // .tok-frame padding
const R = W * 0.036;                             // border-radius: 3.6%

const TIER = {
  tier_1: '#9aa3a8', tier_2: '#7fae82', tier_3: '#6f9dc9',
  tier_4: '#a988d0', tier_5: '#d8a054', tier_6: '#d4685e',
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/'/g, '&#39;').replace(/"/g, '&quot;')
  .replace(/’/g, '&#8217;');

// How wide a piece of text actually comes out.
//
// Guessing from the character count used to do this, and it was wrong often
// enough to push a long name out under the cost badge. So the text is drawn
// once on its own and the ink is measured. Slow, but it is the truth, and
// the answers are kept so each one is only paid for once.
const seen = new Map();
async function measure(text, size, weight) {
  const key = `${weight}|${size}|${text}`;
  if (seen.has(key)) return seen.get(key);
  const pad = Math.ceil(size);
  const box = Math.ceil(text.length * size * 1.2) + pad * 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${box}" height="${Math.ceil(size * 3)}">
    <text x="${pad}" y="${Math.ceil(size * 2)}" font-family="Georgia, serif"
          font-weight="${weight}" font-size="${size}" fill="#000">${esc(text)}</text></svg>`;
  let w = 0;
  try {
    const { info } = await sharp(Buffer.from(svg)).trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });
    w = info.width;
  } catch {
    w = text.length * size * 0.5;        // all blank, or nothing to trim
  }
  seen.set(key, w);
  return w;
}

/** Break text into lines that really do fit inside maxW. */
async function wrap(text, size, maxW, weight = 400) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (line && (await measure(test, size, weight)) > maxW) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderCard(card, artPath, outPath) {
  const tier = TIER[card.tier];
  const isChar = card.type === 'character';

  // ── the rules plate at the foot, measured from the bottom up ────────────
  const bodyPadX = 0.52 * EM, bodyPadTop = 0.38 * EM, bodyPadBot = 0.36 * EM;
  const textSize = 0.64 * EM, lineSize = 0.58 * EM, noSize = 0.48 * EM;
  const innerW = W - 2 * PAD - 2 * bodyPadX - (isChar ? 2.4 * EM : 0);
  const textLines = await wrap(card.text || 'No ability. It simply fights.',
                               textSize, W - 2 * PAD - 2 * bodyPadX, 400);
  const textBlockH = Math.max(3.3 * EM, textLines.length * textSize * 1.32);
  const bodyH = bodyPadTop + lineSize * 1.1 + 0.24 * EM + textBlockH
              + 0.08 * EM + noSize * 1.2 + bodyPadBot;
  const bodyY = H - PAD - bodyH;

  // ── the name plate at the head ──────────────────────────────────────────
  const headPadY = 0.26 * EM;
  const nameSize = 0.92 * EM, costD = 1.7 * EM;
  const nameLines = await wrap(card.name, nameSize, W - 2 * PAD - 0.52 * EM - costD - 0.8 * EM, 600);
  const headH = Math.max(costD + 2 * headPadY * 0.4, headPadY * 2 + nameLines.length * nameSize * 1.1);
  const headY = PAD;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-variant-numeric: lining-nums tabular-nums">
  <defs>
    <linearGradient id="headbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08080a" stop-opacity=".74"/>
      <stop offset="1" stop-color="#08080a" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="bodybg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08080a" stop-opacity=".70"/>
      <stop offset="1" stop-color="#08080a" stop-opacity=".88"/>
    </linearGradient>
    <linearGradient id="shield" x1="0" y1="0" x2=".35" y2="1">
      <stop offset=".30" stop-color="${tier}"/>
      <stop offset="1" stop-color="#000" stop-opacity=".45"/>
    </linearGradient>
    <radialGradient id="costbg" cx=".34" cy=".28" r=".72">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".40"/>
      <stop offset=".58" stop-color="${tier}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="topwash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08080a" stop-opacity=".55"/>
      <stop offset=".55" stop-color="#08080a" stop-opacity=".18"/>
      <stop offset="1" stop-color="#08080a" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="botwash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08080a" stop-opacity="0"/>
      <stop offset=".45" stop-color="#08080a" stop-opacity=".22"/>
      <stop offset="1" stop-color="#08080a" stop-opacity=".55"/>
    </linearGradient>
    <filter id="drop" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${0.012 * W}" stdDeviation="${0.012 * W}" flood-color="#000" flood-opacity=".55"/>
    </filter>
    <filter id="textshadow" x="-30%" y="-40%" width="160%" height="180%">
      <feDropShadow dx="0" dy="${0.0014 * W}" stdDeviation="${0.0026 * W}" flood-color="#000" flood-opacity=".95"/>
      <feDropShadow dx="0" dy="0" stdDeviation="${0.007 * W}" flood-color="#000" flood-opacity=".8"/>
    </filter>
  </defs>

  <!-- a touch of darkness top and bottom so the plates always have something
       to sit on, however bright the painting is. Both fade out, so no edge
       of the wash is ever visible across the painting. -->
  <rect x="0" y="0" width="${W}" height="${H * 0.30}" fill="url(#topwash)"/>
  <rect x="0" y="${H * 0.52}" width="${W}" height="${H * 0.48}" fill="url(#botwash)"/>

  <!-- name plate -->
  <g filter="url(#drop)">
    <rect x="${PAD}" y="${headY}" width="${W - 2 * PAD}" height="${headH}"
          rx="${0.38 * EM}" fill="url(#headbg)"
          stroke="#ffffff" stroke-opacity=".10" stroke-width="${W * 0.0012}"/>
    <rect x="${PAD}" y="${headY + headH - W * 0.0016}" width="${W - 2 * PAD}" height="${W * 0.0016}"
          fill="${tier}"/>
  </g>
  <g font-family="Georgia, 'Times New Roman', serif" font-weight="600" fill="#f6f1e8"
     font-size="${nameSize}" filter="url(#textshadow)">
    ${nameLines.map((l, i) => `<text x="${PAD + 0.52 * EM}" y="${headY + headH / 2 - (nameLines.length - 1) * nameSize * 0.55 + i * nameSize * 1.1 + nameSize * 0.36}">${esc(l)}</text>`).join('\n    ')}
  </g>
  <g>
    <circle cx="${W - PAD - 0.4 * EM - costD / 2}" cy="${headY + headH / 2}" r="${costD / 2}" fill="${tier}"/>
    <circle cx="${W - PAD - 0.4 * EM - costD / 2}" cy="${headY + headH / 2}" r="${costD / 2}" fill="url(#costbg)"/>
    <text x="${W - PAD - 0.4 * EM - costD / 2}" y="${headY + headH / 2 + 0.95 * EM * 0.35}"
          text-anchor="middle" font-family="Georgia, serif" font-weight="700"
          font-size="${0.95 * EM}" fill="#0d0c0a">${card.cost}</text>
  </g>

  <!-- rules plate -->
  <g filter="url(#drop)">
    <rect x="${PAD}" y="${bodyY}" width="${W - 2 * PAD}" height="${bodyH}"
          rx="${0.38 * EM}" fill="url(#bodybg)"
          stroke="#ffffff" stroke-opacity=".08" stroke-width="${W * 0.0012}"/>
  </g>
  <text x="${PAD + bodyPadX}" y="${bodyY + bodyPadTop + lineSize * 0.85}"
        font-family="Georgia, serif" font-size="${lineSize}" fill="${tier}"
        letter-spacing="${0.03 * lineSize}" filter="url(#textshadow)">${esc(card.line)}</text>
  <g font-family="Georgia, serif" font-size="${textSize}" fill="#ffffff" fill-opacity=".88"
     filter="url(#textshadow)">
    ${textLines.map((l, i) => `<text x="${PAD + bodyPadX}" y="${bodyY + bodyPadTop + lineSize * 1.1 + 0.24 * EM + (i + 0.82) * textSize * 1.32}">${esc(l)}</text>`).join('\n    ')}
  </g>
  <!-- Georgia sets numbers as old-style figures, which makes the N0 of the
       card number read as "No". The technical line gets a lining-figure face. -->
  <text x="${PAD + bodyPadX}" y="${bodyY + bodyH - bodyPadBot - noSize * 0.1}"
        font-family="'Trebuchet MS', 'Segoe UI', Arial, sans-serif"
        font-size="${noSize * 0.92}" fill="#ffffff" fill-opacity=".45"
        letter-spacing="${0.07 * noSize}">${esc(card.no)}</text>

  ${isChar ? (() => {
    const ps = 1.3 * EM;
    const pw = Math.max(2 * EM, String(card.power).length * ps * 0.62 + 0.56 * EM);
    const ph = ps * 1.16 + 0.2 * EM;
    const px = W - PAD - 0.3 * EM - pw, py = H - PAD - 0.32 * EM - ph;
    return `<g>
    <path d="M ${px + 0.26 * EM} ${py}
             h ${pw - 0.52 * EM} a ${0.26 * EM} ${0.26 * EM} 0 0 1 ${0.26 * EM} ${0.26 * EM}
             v ${ph - 0.76 * EM} a ${0.5 * EM} ${0.5 * EM} 0 0 1 ${-0.5 * EM} ${0.5 * EM}
             h ${-(pw - 0.76 * EM)} a ${0.26 * EM} ${0.26 * EM} 0 0 1 ${-0.26 * EM} ${-0.26 * EM}
             v ${-(ph - 0.52 * EM)} a ${0.26 * EM} ${0.26 * EM} 0 0 1 ${0.26 * EM} ${-0.26 * EM} z"
          fill="url(#shield)" stroke="#000" stroke-opacity=".75" stroke-width="${W * 0.0014}"/>
    <text x="${px + pw / 2}" y="${py + ph / 2 + ps * 0.36}" text-anchor="middle"
          font-family="Georgia, serif" font-weight="800" font-size="${ps}"
          fill="#0f0e0b">${card.power}</text>
  </g>`;
  })() : ''}
</svg>`;

  const art = await sharp(artPath)
    .resize(W, H, { fit: 'cover', position: 'top' })
    .toBuffer();

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
       <rect width="${W}" height="${H}" rx="${R}" ry="${R}" fill="#fff"/></svg>`);

  await sharp(art)
    .composite([
      { input: Buffer.from(svg) },
      { input: mask, blend: 'dest-in' },
    ])
    .png()
    .toFile(outPath);
  return outPath;
}
