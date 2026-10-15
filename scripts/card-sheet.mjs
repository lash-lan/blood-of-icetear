// A contact sheet of every rendered card, for checking the set at a glance.
//
//   node scripts/card-sheet.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'docs/cards';
const OUT = 'docs/cards-contact-sheet.png';
const COLS = 8;
const CW = 300, CH = Math.round(CW * 528 / 378), GAP = 10;

const files = fs.readdirSync(DIR)
  .filter((f) => f.endsWith('.png') && f !== 'card-back.png')
  .sort();

const rows = Math.ceil(files.length / COLS);
const W = COLS * CW + (COLS + 1) * GAP;
const H = rows * CH + (rows + 1) * GAP;

const tiles = [];
for (let i = 0; i < files.length; i++) {
  tiles.push({
    input: await sharp(path.join(DIR, files[i])).resize(CW, CH).png().toBuffer(),
    left: GAP + (i % COLS) * (CW + GAP),
    top: GAP + Math.floor(i / COLS) * (CH + GAP),
  });
}

await sharp({ create: { width: W, height: H, channels: 3, background: '#0b0d10' } })
  .composite(tiles)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`${files.length} cards, ${COLS} x ${rows}, ${W}x${H} -> ${OUT}`);
console.log(Math.round(fs.statSync(OUT).size / 1024) + ' KB');
