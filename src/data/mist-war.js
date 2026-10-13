// The Mist War — the pieces, the hosts and the ground they fight over.
//
// Akidna lies drowned beneath the Northern Sea, and the mist leaking out of
// her covers the only land bridge between the three continents. Nobody who
// walks into it can see what walks beside them. That is the whole game: five
// hosts in a fog that belongs to a Titan, each able to see only as far as its
// own eyes reach.
//
// Nothing here knows the rules. This file is the world; src/lib/mist-war.js
// is the game.

// ─── the ground ─────────────────────────────────────────────────────────────
// Four kinds, because a player has to read the board at a glance. Sight and
// movement are separate properties on purpose: a wood you can walk into but
// cannot see through is the most useful tile in a fog game.
export const TERRAIN = {
  open: {
    id: 'open', name: 'Open ground', glyph: '',
    walk: true, sight: true,
    note: 'Bare rock and frozen scrub. Nothing stops anything here.',
  },
  wood: {
    id: 'wood', name: 'Fae wood', glyph: '♣',
    walk: true, sight: false,
    note: 'Walk into it and you vanish from every eye outside it. You go blind to the far ground too.',
  },
  crag: {
    id: 'crag', name: 'Frostspine crag', glyph: '▲',
    walk: false, sight: false,
    note: 'Impassable. It blocks the eye as surely as the foot.',
  },
  mistwell: {
    id: 'mistwell', name: 'Mistwell', glyph: '◌',
    walk: true, sight: false,
    note: 'Where Akidna pools thickest. A host standing in one sees a single pace in any direction.',
  },
  shrine: {
    id: 'shrine', name: 'Fae shrine', glyph: '◆',
    walk: true, sight: true,
    note: 'A stone the Fae left standing. Whoever holds it sees further, and whoever holds two marches twice.',
  },
};

export const TERRAIN_IDS = Object.keys(TERRAIN);

// ─── what a piece can do ────────────────────────────────────────────────────
// Movement is given as a pattern the rules engine understands:
//   step   — one tile, in the listed directions
//   slide  — any distance along the listed directions until something stops it
//   jump   — exactly these offsets, over anything in the way
const ORTHO = [[0, -1], [0, 1], [-1, 0], [1, 0]];
const DIAG = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
const ALL = [...ORTHO, ...DIAG];
const LEAPS = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];

// Traits, each one a single rule the engine checks by name.
//   hidden  — enemies cannot see it unless they stand within one tile
//   tough   — a Levy cannot take it
//   double  — may be moved twice in the same turn
//   trample — moves through woods and mistwells without being stopped
//   martyr  — whatever takes it dies with it
export const ROLES = {
  lord: {
    id: 'lord', rank: 'Lord', glyph: '♚', sight: 3, cost: 0,
    move: { kind: 'step', dirs: ALL },
    note: 'One pace in any direction. Lose it and your host leaves the field.',
  },
  herald: {
    id: 'herald', rank: 'Herald', glyph: '♛', sight: 3, cost: 4,
    move: { kind: 'slide', dirs: ALL },
    note: 'Slides any distance in any line. The rarest thing in a host.',
  },
  warden: {
    id: 'warden', rank: 'Warden', glyph: '♜', sight: 2, cost: 3,
    move: { kind: 'slide', dirs: ORTHO },
    note: 'Slides along the straight lines. Holds a road shut by standing on it.',
  },
  seer: {
    id: 'seer', rank: 'Seer', glyph: '♝', sight: 4, cost: 3,
    move: { kind: 'slide', dirs: DIAG },
    note: 'Slides on the diagonals, and sees further through the mist than anything else alive.',
  },
  outrider: {
    id: 'outrider', rank: 'Outrider', glyph: '♞', sight: 3, cost: 3,
    move: { kind: 'jump', dirs: LEAPS },
    note: 'Leaps the crooked leap, over crag and host alike. Nothing blocks it.',
  },
  levy: {
    id: 'levy', rank: 'Levy', glyph: '♟', sight: 2, cost: 1,
    move: { kind: 'step', dirs: ALL },
    note: 'One pace in any direction. There are always more of them than of anything else.',
  },
};

export const ROLE_IDS = Object.keys(ROLES);

// ─── the hosts ──────────────────────────────────────────────────────────────
// Five, each drawn from somewhere real in the world, each with one piece only
// it can field. The unique piece is why two games never play the same: it is
// drawn from the bag like everything else, so you may not get it at all.
export const HOSTS = [
  {
    id: 'rangers',
    name: 'The Red Rangers',
    short: 'Rangers',
    colour: '#b4323a',
    ink: '#ffd9da',
    seat: 'Crimson Veil',
    blurb: 'Women only, out of a hidden fortress in Hollanheart Forest. They reach places armies cannot.',
    cry: 'They did not fight for the Garden Queen. They fought for Ashwinter.',
    unique: {
      id: 'shade', rank: 'Shade', glyph: '♗', sight: 4, cost: 3,
      move: { kind: 'slide', dirs: DIAG },
      traits: ['hidden'],
      note: 'A Red Ranger who has learned the Nyxthorn trick of being absent from importance. No enemy sees her until they stand beside her.',
    },
    names: { lord: 'High Warden', herald: 'Captain', warden: 'Winterguard', seer: 'Moon Warrior', outrider: 'Tracker', levy: 'Ranger' },
  },
  {
    id: 'grey',
    name: 'The Grey Knights',
    short: 'Grey',
    colour: '#8c97a1',
    ink: '#0d1114',
    seat: 'Isdowrath',
    blurb: 'Human, and human only. They exist because one man watched the best human alive be casually outclassed by divine blood.',
    cry: 'When he finally fell, he fell facing south.',
    unique: {
      id: 'bulwark', rank: 'Bulwark', glyph: '♖', sight: 2, cost: 3,
      move: { kind: 'slide', dirs: ORTHO },
      traits: ['tough'],
      note: 'A knight of the Wall. No Levy can bring him down, whatever the odds standing round him.',
    },
    names: { lord: 'Knight King', herald: 'Lord Commander', warden: 'Wallwarden', seer: 'Light Councillor', outrider: 'Black Raider', levy: 'Squire' },
  },
  {
    id: 'dark',
    name: 'The Dark Host',
    short: 'Dark',
    colour: '#7b4bb5',
    ink: '#efe4ff',
    seat: 'The Dark Castle',
    blurb: 'What Anthurian Bloodwing built out of freed slaves, and what was left of it after she refused the throne.',
    cry: 'Freedom causes inevitable conflict.',
    unique: {
      id: 'nightmare', rank: 'Nightmare', glyph: '♘', sight: 3, cost: 4,
      move: { kind: 'jump', dirs: LEAPS },
      traits: ['double'],
      note: 'Bred from an ordinary mare by the Rein that Thaerel carried. It moves twice while anything else moves once.',
    },
    names: { lord: 'Dark Lord', herald: 'High General', warden: 'Lycan', seer: 'Night Witch', outrider: 'Drake', levy: 'Freedman' },
  },
  {
    id: 'beasts',
    name: 'The Beast Lords',
    short: 'Beasts',
    colour: '#5f8f4e',
    ink: '#e8ffdc',
    seat: 'The Verdant Wilds',
    blurb: 'Made by Freyva and Glorion to cull corruption and sustain the world. Nobody asked whether they wished to be.',
    cry: 'Not decorative creatures, but great engines of balance.',
    unique: {
      id: 'behemoth', rank: 'Behemoth', glyph: '♕', sight: 2, cost: 4,
      move: { kind: 'slide', dirs: ALL, limit: 3 },
      traits: ['trample'],
      note: 'Three paces in any line, and the wood does not slow it, because it does not go round trees.',
    },
    names: { lord: 'Beast King', herald: 'Beast Lord', warden: 'Leonar', seer: 'Moon Sprite', outrider: 'Garuda', levy: 'Beastling' },
  },
  {
    id: 'order',
    name: 'The Sacred Order',
    short: 'Order',
    colour: '#c2a24d',
    ink: '#1a1405',
    seat: 'The Bastion of Frost',
    blurb: 'The two bastions, the Winter King under one of them, and every recruit beginning where the seals are thinnest.',
    cry: 'Discipline before desire. Duty before comfort.',
    unique: {
      id: 'saint', rank: 'Saint', glyph: '♔', sight: 3, cost: 3,
      move: { kind: 'step', dirs: ALL },
      traits: ['martyr'],
      note: 'Whoever cuts her down goes with her. The Order has never considered that a loss.',
    },
    names: { lord: 'Arch-Saint', herald: 'Saint Paladin', warden: 'Bastion Knight', seer: 'Knight Sister', outrider: 'Night Sister', levy: 'Novice' },
  },
];

export const hostById = Object.fromEntries(HOSTS.map((h) => [h.id, h]));

// ─── how a host is drawn ────────────────────────────────────────────────────
// Every host gets a Lord and a budget. The bag is drawn from until the budget
// runs out, so two hosts of the same banner are never the same host. The
// floor of Levies exists so that nobody is ever handed four sliders and no
// bodies to put in front of them.
export const MUSTER = {
  budget: 11,
  levyFloor: 3,
  // Weights, not probabilities: a Herald turns up about a tenth as often as
  // a Levy, and the host's own piece is rarer still.
  bag: [
    { role: 'levy', weight: 34 },
    { role: 'warden', weight: 15 },
    { role: 'seer', weight: 15 },
    { role: 'outrider', weight: 15 },
    { role: 'herald', weight: 5 },
    { role: 'unique', weight: 9 },
  ],
};

// ─── the ground, as it is rolled ────────────────────────────────────────────
export const MAPGEN = {
  // Board size grows with the number of hosts so five armies are not standing
  // on each other at the first move.
  size: { 2: 12, 3: 13, 4: 14, 5: 15 },
  shrines: { 2: 3, 3: 4, 4: 5, 5: 5 },
  // Rough share of the board, before the generator smooths it into blobs.
  weights: { wood: 0.17, crag: 0.09, mistwell: 0.06 },
};

// ─── the words the log speaks in ────────────────────────────────────────────
export const LOG_LINES = {
  take: (a, b) => `${a} takes ${b}.`,
  martyr: (a, b) => `${a} takes ${b}, and goes down with her.`,
  lost: (h) => `${h} has lost its Lord. The host leaves the field.`,
  shrine: (h, n) => `${h} holds ${n} shrine${n === 1 ? '' : 's'}.`,
  mist: 'The mist closes again.',
  win: (h) => `${h} holds the bridge. The mist belongs to them now.`,
  draw: 'The turns run out. The mist keeps the bridge.',
};
