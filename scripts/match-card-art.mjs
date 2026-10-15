// Which of the new paintings belongs to which card.
//
// The filenames are the characters' full names, and the card data already
// knows where each card's portrait lives, so matching is a question of
// reducing both to the same shape and seeing what pairs up.
import fs from 'node:fs';
import path from 'node:path';
import { CARDS, artOf, numberOf, TIERS, typeLineOf, costOf } from '../src/data/cards.js';

const DIR = process.argv[2] || 'C:/Users/lashl/Downloads/New Card Art';

const slug = (s) => s.toLowerCase()
  .replace(/\.(png|jpe?g|webp)$/, '')
  .replace(/[’']/g, '')
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Every card that already has a portrait, keyed by that portrait's filename
// and also by the card's own name, so a painting can match on either.
const byArtSlug = new Map();
const byNameSlug = new Map();
for (const k of CARDS) {
  const a = artOf(k);
  if (a) byArtSlug.set(slug(path.basename(a)), k);
  byNameSlug.set(slug(k.name), k);
}

const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const hit = [], miss = [];

for (const f of files) {
  const s = slug(f);
  let k = byNameSlug.get(s) || byArtSlug.get(s);
  // Fall back to the longest card name the filename starts with, which
  // catches "Hannarial Icetear - Captain..." against "Hannarial Icetear,
  // Captain...".
  if (!k) {
    let best = null;
    for (const [ns, card] of byNameSlug) {
      const a = s.replace(/-/g, ''), b = ns.replace(/-/g, '');
      if ((a.startsWith(b) || b.startsWith(a)) && (!best || ns.length > slug(best.name).length)) best = card;
    }
    k = best;
  }
  (k ? hit : miss).push([f, k]);
}

const TIER_RANK = { tier_1: 1, tier_2: 2, tier_3: 3, tier_4: 4, tier_5: 5, tier_6: 6 };
const counts = {};
for (const [, k] of hit) counts[k.tier] = (counts[k.tier] || 0) + 1;

console.log(`${files.length} paintings, ${hit.length} matched, ${miss.length} unmatched\n`);
console.log('by rarity:', Object.entries(counts)
  .sort((a, b) => TIER_RANK[a[0]] - TIER_RANK[b[0]])
  .map(([t, n]) => `${TIERS[t].name} ${n}`).join(', '), '\n');

const below = hit.filter(([, k]) => TIER_RANK[k.tier] < 4);
if (below.length) {
  console.log('Below Epic in the card data:');
  for (const [f, k] of below) console.log('  ' + TIERS[k.tier].name.padEnd(9), k.name, ' <- ' + f);
  console.log();
}
if (miss.length) {
  console.log('No card found for:');
  for (const [f] of miss) console.log('  ' + f);
}
