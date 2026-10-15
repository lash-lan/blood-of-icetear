// Which card a painting belongs to.
//
// The paintings are named after the characters, but not in the card's exact
// words: "Barlgowrath - Ancient Beast, demonic war-leader" is the card
// "Barlgowrath, the Cataclysm". So matching goes from strictest to loosest
// and stops at the first hit, because a loose rule applied too early would
// hand the Captain's portrait to the young Hannarial.
import path from 'node:path';
import { CARDS, artOf } from '../../src/data/cards.js';

export const slug = (s) => s.toLowerCase()
  .replace(/\.(png|jpe?g|webp)$/, '')
  .replace(/[’']/g, '').replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const byArtSlug = new Map(), byNameSlug = new Map();
for (const k of CARDS) {
  const a = artOf(k);
  if (a) byArtSlug.set(slug(path.basename(a)), k);
  byNameSlug.set(slug(k.name), k);
}

/** The longest card name the given slug agrees with from the start. */
function longestPrefix(s) {
  let best = null;
  for (const [ns, card] of byNameSlug) {
    const a = s.replace(/-/g, ''), b = ns.replace(/-/g, '');
    if ((a.startsWith(b) || b.startsWith(a)) &&
        (!best || ns.length > slug(best.name).length)) best = card;
  }
  return best;
}

export function cardFor(file) {
  const s = slug(file);

  // 1. the filename is the card's name, or the name of its existing portrait
  let k = byNameSlug.get(s) || byArtSlug.get(s);
  if (k) return k;

  // 2. one is the start of the other, longest card name winning
  k = longestPrefix(s);
  if (k) return k;

  // 3. the painting carries a description the card does not, as in
  //    "Barlgowrath - Ancient Beast, demonic war-leader". Drop everything
  //    after the first dash and try again. Last, because it is the loosest.
  const head = slug(String(file).split(/\s+-\s+/)[0]);
  if (head && head !== s) return byNameSlug.get(head) || byArtSlug.get(head) || longestPrefix(head);

  return null;
}
