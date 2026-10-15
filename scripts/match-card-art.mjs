// Which of the new paintings belongs to which card.
//
// The filenames are the characters' full names, and the card data already
// knows where each card's portrait lives, so matching is a question of
// reducing both to the same shape and seeing what pairs up.
import fs from 'node:fs';
import { CARDS, TIERS } from '../src/data/cards.js';
import { cardFor } from './lib/card-art-match.mjs';

const DIR = process.argv[2] || 'C:/Users/lashl/Downloads/New Card Art';

const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const hit = [], miss = [];

for (const f of files) {
  const k = cardFor(f);
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
