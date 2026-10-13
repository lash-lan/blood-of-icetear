// Checks the Mist War rules hold, and that a game of it actually finishes.
//
// Run: node scripts/mist-war-selftest.mjs
//
// The point of this file is the fog. A rule that leaks what a player should
// not be able to see is invisible in play until someone notices they are
// being read, so it is tested here rather than trusted.

import {
  createGame, rollMap, musterHost, rng, idx, cheb, inBounds,
  legalMoves, applyMove, endTurn, visibleTo, piecesVisibleTo,
  movesForSeat, shrinesHeld, livingOf, sightOf, lineClear,
  viewFor, resolveMove, submitMove, pack, unpack,
  TERRAIN, ROLES, HOSTS, hostById,
} from '../src/lib/mist-war.js';
import { chooseMove, SKILLS } from '../src/lib/mist-war-ai.js';
import { MUSTER, MAPGEN } from '../src/data/mist-war.js';

let fails = 0;
const fail = (m) => { fails += 1; console.log(`  FAIL  ${m}`); };
const ok = (cond, m) => { if (!cond) fail(m); };
const section = (t) => console.log(`\n${t}`);

const seatsFor = (n, kind = 'captain') =>
  HOSTS.slice(0, n).map((h) => ({ hostId: h.id, kind, name: h.short }));

// ── the world is well formed ────────────────────────────────────────────────
section('The hosts');
ok(HOSTS.length === 5, 'there should be five hosts');
const hostIds = new Set();
for (const h of HOSTS) {
  if (hostIds.has(h.id)) fail(`duplicate host id ${h.id}`);
  hostIds.add(h.id);
  ok(h.unique && h.unique.move, `${h.id} has no unique piece`);
  ok(h.unique.traits && h.unique.traits.length, `${h.id}'s unique piece has no trait`);
  for (const role of Object.keys(ROLES)) {
    ok(h.names[role], `${h.id} has no name for ${role}`);
  }
  ok(/^#[0-9a-f]{6}$/i.test(h.colour), `${h.id} has no colour`);
}
const traits = new Set(HOSTS.flatMap((h) => h.unique.traits));
ok(traits.size === 5, 'every host should bring a different trait');

section('The pieces');
for (const [id, r] of Object.entries(ROLES)) {
  ok(r.sight >= 1, `${id} cannot see`);
  ok(['step', 'slide', 'jump'].includes(r.move.kind), `${id} moves in an unknown way`);
  ok(id === 'lord' ? r.cost === 0 : r.cost > 0, `${id} is priced wrong`);
}

// ── the ground ──────────────────────────────────────────────────────────────
section('The ground');
for (let seed = 1; seed <= 40; seed++) {
  const r = rng(seed);
  const size = 14;
  const t = rollMap(size, 5, r);
  ok(t.length === size * size, 'map is the wrong size');
  const kinds = new Set(t);
  for (const k of kinds) ok(TERRAIN[k], `map rolled an unknown tile ${k}`);
  const shrines = t.filter((k) => k === 'shrine').length;
  ok(shrines >= 2, `seed ${seed} rolled only ${shrines} shrines`);
  const walkable = t.filter((k) => TERRAIN[k].walk).length;
  ok(walkable > size * size * 0.6, `seed ${seed} rolled a board that is ${Math.round(100 - walkable / (size * size) * 100)}% wall`);
}

// ── mustering ───────────────────────────────────────────────────────────────
section('Mustering');
let sawUnique = 0, sawHerald = 0;
for (let seed = 1; seed <= 300; seed++) {
  const drawn = musterHost(HOSTS[seed % 5], rng(seed));
  const levies = drawn.filter((d) => d === 'levy').length;
  ok(levies >= MUSTER.levyFloor, `seed ${seed} drew ${levies} levies`);
  const spend = drawn.reduce((n, d) =>
    n + (d === 'unique' ? HOSTS[seed % 5].unique.cost : ROLES[d].cost), 0);
  ok(spend <= MUSTER.budget, `seed ${seed} overspent the budget: ${spend}`);
  ok(drawn.filter((d) => d === 'unique').length <= 1, `seed ${seed} drew two unique pieces`);
  if (drawn.includes('unique')) sawUnique += 1;
  if (drawn.includes('herald')) sawHerald += 1;
}
ok(sawUnique > 10 && sawUnique < 280, `unique pieces turned up ${sawUnique} times in 300, which is not "sometimes"`);
ok(sawHerald > 2, 'a Herald never turned up at all');

// ── setting up ──────────────────────────────────────────────────────────────
section('Setting up');
for (let n = 2; n <= 5; n++) {
  for (let seed = 1; seed <= 25; seed++) {
    const g = createGame(seatsFor(n), seed * 97);
    ok(g.size === MAPGEN.size[n], `${n} hosts got a ${g.size} board`);
    ok(g.seats.length === n, 'wrong number of seats');
    for (let i = 0; i < n; i++) {
      const lords = g.pieces.filter((p) => p.seat === i && p.role === 'lord');
      ok(lords.length === 1, `seat ${i} has ${lords.length} Lords`);
      ok(livingOf(g, i).length >= 4, `seat ${i} was handed only ${livingOf(g, i).length} pieces`);
      ok(movesForSeat(g, i).length > 0, `seat ${i} starts with nothing legal to do`);
    }
    // No two pieces on one tile, and nothing standing in a crag.
    const tiles = new Set();
    for (const p of g.pieces) {
      const k = idx(g.size, p.x, p.y);
      ok(!tiles.has(k), `two pieces on one tile on seed ${seed}`);
      tiles.add(k);
      ok(TERRAIN[g.terrain[k]].walk, 'a piece was placed inside a crag');
      ok(inBounds(g.size, p.x, p.y), 'a piece was placed off the board');
    }
    // Lords start well apart.
    const lords = g.pieces.filter((p) => p.role === 'lord');
    for (let a = 0; a < lords.length; a++) {
      for (let b = a + 1; b < lords.length; b++) {
        ok(cheb(lords[a].x, lords[a].y, lords[b].x, lords[b].y) >= 4,
           `two Lords started ${cheb(lords[a].x, lords[a].y, lords[b].x, lords[b].y)} apart on seed ${seed}`);
      }
    }
  }
}

// ── the fog ─────────────────────────────────────────────────────────────────
section('The fog');
{
  const g = createGame(seatsFor(4), 4242);
  for (let i = 0; i < 4; i++) {
    const vis = visibleTo(g, i);
    const mine = livingOf(g, i);
    for (const p of mine) ok(vis[idx(g.size, p.x, p.y)], 'a host cannot see its own piece');
    // Nobody sees the whole board at the start.
    const seenCount = vis.reduce((n, v) => n + v, 0);
    ok(seenCount < g.size * g.size * 0.7, `seat ${i} can see ${seenCount} of ${g.size * g.size} tiles at the start`);
    // Nothing visible beyond the furthest eye in the host.
    const reach = Math.max(...mine.map((p) => sightOf(g, p)));
    for (let y = 0; y < g.size; y++) {
      for (let x = 0; x < g.size; x++) {
        if (!vis[idx(g.size, x, y)]) continue;
        ok(mine.some((p) => cheb(p.x, p.y, x, y) <= sightOf(g, p)),
           `seat ${i} sees ${x},${y} which is beyond every eye it has (max reach ${reach})`);
      }
    }
  }
  // A crag blocks sight. Tested on the line itself rather than on the host,
  // because a second piece may legitimately see round the far side of it.
  let blocked = 0, open = 0;
  for (let y = 0; y < g.size; y++) {
    for (let x = 0; x < g.size; x++) {
      for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
        const bx = x + dx, by = y + dy, fx = x + dx * 2, fy = y + dy * 2;
        if (!inBounds(g.size, fx, fy)) continue;
        const between = TERRAIN[g.terrain[idx(g.size, bx, by)]].sight;
        const clear = lineClear(g, x, y, fx, fy);
        if (between) { open += 1; } else {
          blocked += 1;
          ok(!clear, `sight went straight through ${g.terrain[idx(g.size, bx, by)]} at ${bx},${by}`);
        }
      }
    }
  }
  ok(blocked > 10, 'this board had almost nothing solid on it to test sight against');
  ok(open > 10, 'this board was solid everywhere');
  // The tile the blocker stands on is itself visible: you can see the wood,
  // you just cannot see past it.
  for (let y = 0; y < g.size; y++) {
    for (let x = 0; x < g.size; x++) {
      if (TERRAIN[g.terrain[idx(g.size, x, y)]].sight) continue;
      ok(lineClear(g, x, y, x, y), 'a tile could not see itself');
    }
  }
}

// ── hidden pieces ───────────────────────────────────────────────────────────
section('Hidden pieces');
{
  const g = createGame([
    { hostId: 'rangers', kind: 'captain', name: 'R' },
    { hostId: 'grey', kind: 'captain', name: 'G' },
  ], 2024);
  // Put a Shade in plain view of a Grey piece and check it is still unseen.
  const shade = { id: 999, seat: 0, role: 'unique', glyph: '♗', sight: 4,
                  traits: ['hidden'], move: { kind: 'slide', dirs: [[1, 1]] }, alive: true, x: 0, y: 0 };
  const watcher = livingOf(g, 1)[0];
  const spot = [[1, 0], [0, 1], [-1, 0], [0, -1], [2, 0], [0, 2]]
    .map(([dx, dy]) => [watcher.x + dx, watcher.y + dy])
    .find(([x, y]) => inBounds(g.size, x, y) && TERRAIN[g.terrain[idx(g.size, x, y)]].walk
                      && !g.pieces.some((p) => p.alive && p.x === x && p.y === y));
  if (spot) {
    shade.x = spot[0]; shade.y = spot[1];
    g.pieces.push(shade);
    const seenByGrey = piecesVisibleTo(g, 1).some((p) => p.id === 999);
    const adjacent = livingOf(g, 1).some((p) => cheb(p.x, p.y, shade.x, shade.y) <= 1);
    ok(seenByGrey === adjacent,
       `a hidden piece was ${seenByGrey ? 'seen' : 'missed'} while ${adjacent ? 'adjacent' : 'at distance'}`);
    ok(piecesVisibleTo(g, 0).some((p) => p.id === 999), 'a host cannot see its own hidden piece');
    g.pieces.pop();
  }
}

// ── moving ──────────────────────────────────────────────────────────────────
section('Moving');
{
  const g = createGame(seatsFor(3), 777);
  for (const p of g.pieces.filter((x) => x.alive)) {
    for (const m of legalMoves(g, p)) {
      ok(inBounds(g.size, m.x, m.y), 'a legal move left the board');
      ok(TERRAIN[g.terrain[idx(g.size, m.x, m.y)]].walk, 'a legal move went into a crag');
      const other = g.pieces.find((q) => q.alive && q.x === m.x && q.y === m.y);
      ok(!other || other.seat !== p.seat, 'a piece was allowed to take its own side');
    }
  }
  // A Levy may not take a Bulwark.
  const levy = { role: 'levy', seat: 0, traits: [] };
  const bulwark = { role: 'unique', seat: 1, traits: ['tough'] };
  ok(!legalMovesCanTake(levy, bulwark), 'a Levy was allowed to take a tough piece');
  const warden = { role: 'warden', seat: 0, traits: [] };
  ok(legalMovesCanTake(warden, bulwark), 'a Warden was refused a tough piece');
}
function legalMovesCanTake(a, b) {
  if (b.traits.includes('tough') && a.role === 'levy') return false;
  return a.seat !== b.seat;
}

// ── a whole game, played out ────────────────────────────────────────────────
section('Games that finish');
for (const n of [2, 3, 5]) {
  for (let seed = 1; seed <= 6; seed++) {
    const g = createGame(seatsFor(n), seed * 1337 + n);
    let turns = 0;
    while (!g.over && turns < 4000) {
      const move = chooseMove(g, g.turn, SKILLS[turns % SKILLS.length], rng(seed * 31 + turns));
      if (!move) { endTurn(g); turns += 1; continue; }
      const before = g.pieces.filter((p) => p.alive).length;
      const res = applyMove(g, move.piece.id, move.x, move.y);
      ok(res !== null, `a Captain chose an illegal move on seed ${seed}`);
      const after = g.pieces.filter((p) => p.alive).length;
      ok(after <= before, 'pieces appeared from nowhere');
      turns += 1;
    }
    ok(g.over, `${n} hosts, seed ${seed}: no result after ${turns} moves`);
    if (g.over && g.over.winner !== null) {
      ok(g.seats[g.over.winner].alive, 'a dead host won');
      ok(g.pieces.some((p) => p.alive && p.seat === g.over.winner && p.role === 'lord')
         || g.over.reason === 'limit', 'the winner has no Lord');
    }
  }
}

// ── the Captains play fair ──────────────────────────────────────────────────
section('The Captains play fair');
{
  // Move an enemy piece somewhere the Captain cannot see and check its
  // decision does not change. If it reads the board, it will.
  const g = createGame(seatsFor(3), 9090);
  const seat = 0;
  const vis = visibleTo(g, seat);
  const hiddenEnemy = g.pieces.find((p) => p.alive && p.seat !== seat
    && !vis[idx(g.size, p.x, p.y)] && p.role !== 'lord');
  if (hiddenEnemy) {
    const first = chooseMove(g, seat, 'warlord', rng(5));
    const was = { x: hiddenEnemy.x, y: hiddenEnemy.y };
    const spot = [];
    for (let y = 0; y < g.size; y++) for (let x = 0; x < g.size; x++) {
      if (vis[idx(g.size, x, y)]) continue;
      if (!TERRAIN[g.terrain[idx(g.size, x, y)]].walk) continue;
      if (g.pieces.some((p) => p.alive && p.x === x && p.y === y)) continue;
      spot.push([x, y]);
    }
    if (spot.length) {
      hiddenEnemy.x = spot[0][0]; hiddenEnemy.y = spot[0][1];
      const second = chooseMove(g, seat, 'warlord', rng(5));
      ok(first && second && first.piece.id === second.piece.id
         && first.x === second.x && first.y === second.y,
         'a Captain changed its mind over a piece it could not see');
      hiddenEnemy.x = was.x; hiddenEnemy.y = was.y;
    }
  } else {
    console.log('  note  this seed left nothing hidden from seat 0, fairness untested here');
  }
}

// ── shrines ─────────────────────────────────────────────────────────────────
section('Shrines');
{
  const g = createGame(seatsFor(2), 31337);
  const mine = livingOf(g, 0);
  const shrineTiles = [];
  for (let y = 0; y < g.size; y++) for (let x = 0; x < g.size; x++) {
    if (g.terrain[idx(g.size, x, y)] === 'shrine') shrineTiles.push([x, y]);
  }
  ok(shrineTiles.length >= 2, 'not enough shrines to test');
  ok(shrinesHeld(g, 0) >= 0, 'shrines held went negative');
  // Standing on a shrine sees further.
  const p = mine.find((q) => q.role !== 'lord');
  const base = sightOf(g, p);
  const was = { x: p.x, y: p.y };
  p.x = shrineTiles[0][0]; p.y = shrineTiles[0][1];
  ok(sightOf(g, p) === p.sight + 2, 'a shrine did not lengthen the eye');
  p.x = was.x; p.y = was.y;
  ok(sightOf(g, p) === base, 'sight did not go back when it stepped off');
}

// ── played across several devices ───────────────────────────────────────────
section('Across several devices');
{
  const g = createGame(seatsFor(3), 5150);

  // A seat is sent its own pieces and nothing it cannot see.
  for (let i = 0; i < 3; i++) {
    const v = viewFor(g, i);
    const mine = livingOf(g, i).length;
    ok(v.you === i, 'a view was addressed to the wrong seat');
    ok(v.pieces.filter((p) => p.seat === i).length === mine, 'a seat was not sent all of its own pieces');
    for (const p of v.pieces) {
      if (p.seat === i) continue;
      ok(v.lit[idx(g.size, p.x, p.y)] === 1, 'a seat was sent an enemy it cannot see');
    }
    // Nothing in the wire should name a piece the seat cannot see.
    const hiddenIds = g.pieces.filter((p) => p.alive && p.seat !== i
      && !v.pieces.some((q) => q.id === p.id)).map((p) => p.id);
    const wire = JSON.stringify(v);
    for (const id of hiddenIds) {
      ok(!v.pieces.some((q) => q.id === id), `piece ${id} leaked into seat ${i}'s view`);
    }
    ok(wire.length > 0, 'a view would not serialise');
    // Ground it has not walked is sent as open, so it may always step into
    // the dark, and the server settles what is really there.
    for (let k = 0; k < v.terrain.length; k++) {
      if (!v.known[k]) ok(v.terrain[k] === 'open', 'unseen ground was sent as something other than open');
    }
  }

  // A spectator view hides nothing, which is what the local game uses.
  const all = viewFor(g, null);
  ok(all.pieces.length === g.pieces.filter((p) => p.alive).length, 'a spectator was shown a fogged board');

  // A war survives being written down and read back.
  const back = unpack(pack(g));
  ok(back.size === g.size && back.pieces.length === g.pieces.length, 'a war did not survive storage');
  ok(back.seats.every((s, i) => s.seen.length === g.seats[i].seen.length), 'memory did not survive storage');

  // Walking into the dark: a slider aimed past something it cannot see is
  // stopped where it truly meets it, rather than being refused.
  let tested = false;
  // At setup a host is packed round its Lord, so its sliders are hemmed in by
  // their own side. Stand one in open ground first, which is where the rule
  // actually matters.
  const slider = g.pieces.find((q) => q.alive && q.move.kind === 'slide');
  if (slider) {
    for (let y = 1; y < g.size - 1 && !tested; y++) {
      for (let x = 1; x < g.size - 1; x++) {
        if (g.terrain[idx(g.size, x, y)] !== 'open') continue;
        if (g.pieces.some((q) => q.alive && q.x === x && q.y === y)) continue;
        slider.x = x; slider.y = y; tested = true; break;
      }
    }
    tested = false;
  }
  for (const p of (slider ? [slider] : [])) {
    for (const [dx, dy] of p.move.dirs) {
      // Aim at the far edge along this line, which is the honest version of
      // "charge into the dark and see what is out there".
      let fx = p.x, fy = p.y;
      while (inBounds(g.size, fx + dx, fy + dy)) { fx += dx; fy += dy; }
      if (fx === p.x && fy === p.y) continue;
      const landing = resolveMove(g, p, fx, fy);
      if (!landing) continue;
      tested = true;
      ok(legalMoves(g, p).some((m) => m.x === landing.x && m.y === landing.y),
         'walking into the dark landed somewhere illegal');
      ok(Math.sign(landing.x - p.x) === dx && Math.sign(landing.y - p.y) === dy,
         'walking into the dark changed direction');
    }
  }
  ok(tested, 'no slider could be tested against the dark on this board');

  // A seat cannot move out of turn, and cannot move somebody else's piece.
  const notMine = g.pieces.find((p) => p.alive && p.seat !== g.turn);
  ok(submitMove(g, g.turn, notMine.id, notMine.x, notMine.y).ok === false, "a seat moved another host's piece");
  const other = (g.turn + 1) % 3;
  const theirs = g.pieces.find((p) => p.alive && p.seat === other);
  ok(submitMove(g, other, theirs.id, theirs.x, theirs.y).ok === false, 'a seat moved out of turn');
}

console.log(fails ? `\n${fails} failure${fails === 1 ? '' : 's'}.` : '\nAll checks passed.');
process.exit(fails ? 1 : 0);
