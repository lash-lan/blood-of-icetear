// Turn a folder of paintings into finished cards.
//
// Everything printed on a card comes out of src/data/cards.js, so a card can
// never disagree with the game. The painting supplies the picture and nothing
// else: the name, rarity, lineage, Power, Cost, ability and printed number
// are all read from the card record the painting matched.
//
//   node scripts/render-cards.mjs "C:/Users/lashl/Downloads/New Card Art"
//   node scripts/render-cards.mjs <dir> --only tiamel      one card, to check
import fs from 'node:fs';
import path from 'node:path';
import { CARDS, artOf, numberOf, TIERS, typeLineOf } from '../src/data/cards.js';
import { renderCard } from './lib/render-card.mjs';

const DIR = process.argv[2] || 'C:/Users/lashl/Downloads/New Card Art';
const OUT = 'docs/cards';
const onlyAt = process.argv.indexOf('--only');
const ONLY = onlyAt > -1 ? process.argv[onlyAt + 1].toLowerCase() : null;

const slug = (s) => s.toLowerCase()
  .replace(/\.(png|jpe?g|webp)$/, '')
  .replace(/[’']/g, '').replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const byArtSlug = new Map(), byNameSlug = new Map();
for (const k of CARDS) {
  const a = artOf(k);
  if (a) byArtSlug.set(slug(path.basename(a)), k);
  byNameSlug.set(slug(k.name), k);
}

/** The card a painting belongs to, by filename. */
function cardFor(file) {
  const s = slug(file);
  let k = byNameSlug.get(s) || byArtSlug.get(s);
  if (k) return k;
  // "Hannarial Icetear - Captain of..." against "Hannarial Icetear, Captain
  // of...": whichever card name the filename agrees with for longest.
  let best = null;
  for (const [ns, card] of byNameSlug) {
    const a = s.replace(/-/g, ''), b = ns.replace(/-/g, '');
    if ((a.startsWith(b) || b.startsWith(a)) &&
        (!best || ns.length > slug(best.name).length)) best = card;
  }
  return best;
}

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(DIR)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .filter((f) => !ONLY || slug(f).includes(ONLY));

let made = 0, skipped = 0, bytes = 0;
for (const f of files) {
  const k = cardFor(f);
  if (!k) { console.log('no card for ' + f); skipped += 1; continue; }

  const out = path.join(OUT, slug(path.basename(artOf(k) || k.name)) + '.png');
  await renderCard({
    name: k.name,
    cost: k.cost,
    power: k.power,
    tier: k.tier,
    type: k.type,
    line: `${TIERS[k.tier].name} - ${typeLineOf(k)}`,
    no: `${numberOf(k)} - ${TIERS[k.tier].letter} - LASH`,
    text: k.text,
  }, path.join(DIR, f), out);

  const kb = fs.statSync(out).size;
  bytes += kb;
  made += 1;
  console.log(
    TIERS[k.tier].name.padEnd(10),
    String(k.power).padStart(2) + ' / ' + k.cost,
    ' ' + path.basename(out).padEnd(34),
    Math.round(kb / 1024) + ' KB',
  );
}
console.log(`\n${made} cards, ${skipped} skipped, ${Math.round(bytes / 1024 / 1024)} MB in ${OUT}`);
