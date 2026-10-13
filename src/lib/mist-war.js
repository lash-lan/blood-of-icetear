// The Mist War — the rules, with no interface attached.
//
// Everything the game knows how to do lives here as plain functions over a
// plain state object, the same way Citadel Wars is built, so the board can be
// redrawn, replaced or tested without touching a rule. Nothing here reads the
// document and nothing here draws.
//
// THE SHAPE OF IT
//
//   A square board of rolled ground. Two to five hosts, each dropped at a
//   random point far from the others with a host drawn at random from a bag,
//   so no two games begin alike. Every host sees only what its own pieces can
//   see, and the mist closes behind them.
//
//   A turn is one move. Hold two shrines and it is two. Lose your Lord and
//   your host leaves the field. The last Lord standing holds the bridge.

import { TERRAIN, ROLES, HOSTS, hostById, MUSTER, MAPGEN, LOG_LINES } from '../data/mist-war.js';

export { TERRAIN, ROLES, HOSTS, hostById };

// ─── dice ───────────────────────────────────────────────────────────────────
// Seeded on purpose. A game can be handed to someone else as a number, and
// the self-test can roll the same board twice.
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (r, list) => list[Math.floor(r() * list.length)];
const shuffle = (r, list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── the board ──────────────────────────────────────────────────────────────
export const idx = (s, x, y) => y * s + x;
export const inBounds = (s, x, y) => x >= 0 && y >= 0 && x < s && y < s;
export const cheb = (ax, ay, bx, by) => Math.max(Math.abs(ax - bx), Math.abs(ay - by));

/**
 * Roll the ground. Terrain is scattered and then grown, so the map comes out
 * in woods and ridges rather than in noise, which is what makes hiding in it
 * worth doing.
 */
export function rollMap(size, shrineCount, r) {
  const t = new Array(size * size).fill('open');
  const seedCount = Math.round(size * size * 0.06);

  const grow = (kind, seeds, steps) => {
    const heads = [];
    for (let i = 0; i < seeds; i++) heads.push([Math.floor(r() * size), Math.floor(r() * size)]);
    for (const [sx, sy] of heads) {
      let x = sx, y = sy;
      for (let i = 0; i < steps; i++) {
        if (inBounds(size, x, y)) t[idx(size, x, y)] = kind;
        const d = pick(r, [[0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]]);
        x += d[0]; y += d[1];
        if (!inBounds(size, x, y)) break;
      }
    }
  };

  grow('wood', Math.max(2, Math.round(seedCount * 0.9)), Math.round(size * 0.9));
  grow('crag', Math.max(2, Math.round(seedCount * 0.5)), Math.round(size * 0.6));
  grow('mistwell', Math.max(2, Math.round(seedCount * 0.4)), Math.round(size * 0.4));

  // The rim stays open, so nobody is ever walled into a corner by the roll.
  for (let i = 0; i < size; i++) {
    for (const [x, y] of [[i, 0], [i, size - 1], [0, i], [size - 1, i]]) {
      if (t[idx(size, x, y)] === 'crag') t[idx(size, x, y)] = 'open';
    }
  }

  // Shrines are spread rather than scattered: each one has to stand clear of
  // the last, or they are not worth fighting over separately.
  const want = Math.max(2, Math.floor(size / 3));
  const shrines = [];
  for (let tries = 0; tries < 900 && shrines.length < shrineCount; tries++) {
    const x = Math.floor(r() * size), y = Math.floor(r() * size);
    if (!TERRAIN[t[idx(size, x, y)]].walk) continue;
    if (shrines.some(([sx, sy]) => cheb(sx, sy, x, y) < want)) continue;
    shrines.push([x, y]);
  }
  for (const [x, y] of shrines) t[idx(size, x, y)] = 'shrine';

  return t;
}

/** Draw a host out of the bag until the budget is spent. */
export function musterHost(host, r) {
  const drawn = [];
  let spent = 0;
  const bag = MUSTER.bag;
  const total = bag.reduce((n, b) => n + b.weight, 0);

  // The floor first, so every host has bodies.
  for (let i = 0; i < MUSTER.levyFloor; i++) { drawn.push('levy'); spent += ROLES.levy.cost; }

  let guard = 0;
  while (spent < MUSTER.budget && guard++ < 200) {
    let roll = r() * total, chosen = bag[bag.length - 1].role;
    for (const b of bag) { roll -= b.weight; if (roll <= 0) { chosen = b.role; break; } }
    const def = chosen === 'unique' ? host.unique : ROLES[chosen];
    if (spent + def.cost > MUSTER.budget) continue;
    // One of a host's own piece at most. It is meant to be the thing you
    // remember about that game, not a squad.
    if (chosen === 'unique' && drawn.includes('unique')) continue;
    drawn.push(chosen);
    spent += def.cost;
  }
  return drawn;
}

/** What a drawn entry actually is, once the host is known. */
export function defOf(seat, roleId) {
  const host = hostById[seat.hostId];
  if (roleId === 'unique') return { ...host.unique, role: 'unique' };
  return { ...ROLES[roleId], traits: [], role: roleId };
}

export function rankName(seat, piece) {
  const host = hostById[seat.hostId];
  if (piece.role === 'unique') return host.unique.rank;
  return host.names[piece.role] || ROLES[piece.role].rank;
}

/** Spawn points: as far from each other as the board allows. */
function spawnPoints(size, terrain, n, r) {
  const walkable = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const k = terrain[idx(size, x, y)];
      if (TERRAIN[k].walk && k !== 'shrine') walkable.push([x, y]);
    }
  }
  let best = null, bestScore = -1;
  for (let attempt = 0; attempt < 400; attempt++) {
    const chosen = [];
    for (const p of shuffle(r, walkable)) {
      if (chosen.length >= n) break;
      if (chosen.every(([cx, cy]) => cheb(cx, cy, p[0], p[1]) >= Math.floor(size / 2.4))) chosen.push(p);
    }
    if (chosen.length < n) continue;
    const score = chosen.reduce((m, a, i) => {
      let near = Infinity;
      chosen.forEach((b, j) => { if (i !== j) near = Math.min(near, cheb(a[0], a[1], b[0], b[1])); });
      return m + near;
    }, 0);
    if (score > bestScore) { bestScore = score; best = chosen; }
    if (attempt > 40 && best) break;
  }
  // If the roll was unkind, fall back to the furthest apart we can manage.
  return best || shuffle(r, walkable).slice(0, n);
}

/** Free tiles round a point, nearest first, for standing a host up. */
function ringAround(size, terrain, taken, x, y, want) {
  const out = [];
  for (let radius = 1; radius <= size && out.length < want; radius++) {
    const ring = [];
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue;
        const nx = x + dx, ny = y + dy;
        if (!inBounds(size, nx, ny)) continue;
        if (!TERRAIN[terrain[idx(size, nx, ny)]].walk) continue;
        if (taken.has(idx(size, nx, ny))) continue;
        ring.push([nx, ny]);
      }
    }
    out.push(...ring);
  }
  return out.slice(0, want);
}

/**
 * Begin a war.
 * @param {{hostId:string, kind:'human'|'captain', name:string}[]} seats
 */
export function createGame(seats, seed = Math.floor(Math.random() * 1e9)) {
  const r = rng(seed);
  const n = seats.length;
  const size = MAPGEN.size[n] || 14;
  const terrain = rollMap(size, MAPGEN.shrines[n] || 4, r);
  const points = spawnPoints(size, terrain, n, r);

  const state = {
    seed, size, terrain,
    seats: seats.map((s, i) => ({
      i, hostId: s.hostId, kind: s.kind, name: s.name,
      alive: true,
      seen: new Uint8Array(size * size),
      movesLeft: 1,
    })),
    pieces: [],
    turn: 0,
    round: 1,
    extraFor: null,
    log: [],
    over: null,
    limit: 160,
  };

  let nextId = 1;
  const taken = new Set();
  state.seats.forEach((seat, i) => {
    const host = hostById[seat.hostId];
    const [x, y] = points[i] || [0, 0];
    const drawn = musterHost(host, r);
    taken.add(idx(size, x, y));
    const place = (roleId, px, py) => {
      const def = defOf(seat, roleId);
      state.pieces.push({
        id: nextId++, seat: i, role: def.role, glyph: def.glyph, sight: def.sight,
        traits: def.traits || [], move: def.move, x: px, y: py, alive: true,
      });
    };
    place('lord', x, y);
    const spots = ringAround(size, terrain, taken, x, y, drawn.length);
    drawn.forEach((roleId, k) => {
      const spot = spots[k];
      if (!spot) return;
      taken.add(idx(size, spot[0], spot[1]));
      place(roleId, spot[0], spot[1]);
    });
  });

  beginTurn(state);
  return state;
}

// ─── sight ──────────────────────────────────────────────────────────────────
const blocksSight = (state, x, y) => !TERRAIN[state.terrain[idx(state.size, x, y)]].sight;

/** How far a piece can actually see from where it is standing. */
export function sightOf(state, piece) {
  const here = state.terrain[idx(state.size, piece.x, piece.y)];
  if (here === 'mistwell' || here === 'wood') return 1;
  if (here === 'shrine') return piece.sight + 2;
  return piece.sight;
}

/**
 * A straight line that stops at the first thing it cannot see through.
 * Exported so the self-test can check the line itself rather than inferring it
 * from a whole host, which can legitimately see round a corner.
 */
export function lineClear(state, x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy, x = x0, y = y0;
  for (let guard = 0; guard < 64; guard++) {
    if (x === x1 && y === y1) return true;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
    if (x === x1 && y === y1) return true;
    if (blocksSight(state, x, y)) return false;
  }
  return true;
}

/** Every tile a seat can see this instant. */
export function visibleTo(state, seatIndex) {
  const { size } = state;
  const vis = new Uint8Array(size * size);
  for (const p of state.pieces) {
    if (!p.alive || p.seat !== seatIndex) continue;
    const range = sightOf(state, p);
    for (let y = Math.max(0, p.y - range); y <= Math.min(size - 1, p.y + range); y++) {
      for (let x = Math.max(0, p.x - range); x <= Math.min(size - 1, p.x + range); x++) {
        if (cheb(p.x, p.y, x, y) > range) continue;
        if (vis[idx(size, x, y)]) continue;
        if (lineClear(state, p.x, p.y, x, y)) vis[idx(size, x, y)] = 1;
      }
    }
  }
  return vis;
}

/** Enemy pieces a seat can actually make out, hidden ones included or not. */
export function piecesVisibleTo(state, seatIndex, vis = visibleTo(state, seatIndex)) {
  const mine = state.pieces.filter((p) => p.alive && p.seat === seatIndex);
  return state.pieces.filter((p) => {
    if (!p.alive) return false;
    if (p.seat === seatIndex) return true;
    if (!vis[idx(state.size, p.x, p.y)]) return false;
    if (p.traits.includes('hidden')) {
      return mine.some((m) => cheb(m.x, m.y, p.x, p.y) <= 1);
    }
    return true;
  });
}

/** Fold what is seen now into what this seat remembers of the ground. */
export function remember(state, seatIndex, vis = visibleTo(state, seatIndex)) {
  const seat = state.seats[seatIndex];
  for (let i = 0; i < vis.length; i++) if (vis[i]) seat.seen[i] = 1;
}

// ─── moving ─────────────────────────────────────────────────────────────────
export const pieceAt = (state, x, y) =>
  state.pieces.find((p) => p.alive && p.x === x && p.y === y) || null;

/** Can this piece take that one? */
export function canTake(attacker, target) {
  if (!target) return true;
  if (target.seat === attacker.seat) return false;
  if (target.traits.includes('tough') && attacker.role === 'levy') return false;
  return true;
}

/** Every square a piece may legally reach. */
export function legalMoves(state, piece) {
  if (!piece || !piece.alive) return [];
  const { size } = state;
  const out = [];
  const m = piece.move;
  const trample = piece.traits.includes('trample');

  const consider = (x, y) => {
    if (!inBounds(size, x, y)) return null;
    const ground = TERRAIN[state.terrain[idx(size, x, y)]];
    if (!ground.walk) return null;
    const other = pieceAt(state, x, y);
    if (other && !canTake(piece, other)) return 'stop';
    if (other && other.seat === piece.seat) return 'stop';
    out.push({ x, y, takes: other ? other.id : null });
    return other ? 'stop' : 'go';
  };

  if (m.kind === 'step' || m.kind === 'jump') {
    for (const [dx, dy] of m.dirs) consider(piece.x + dx, piece.y + dy);
  } else if (m.kind === 'slide') {
    for (const [dx, dy] of m.dirs) {
      let x = piece.x, y = piece.y;
      const limit = m.limit || size;
      for (let step = 0; step < limit; step++) {
        x += dx; y += dy;
        const verdict = consider(x, y);
        if (verdict !== 'go') break;
        // Undergrowth and pooled mist break a charge, unless the thing
        // charging is large enough not to care.
        const ground = state.terrain[idx(size, x, y)];
        if (!trample && (ground === 'wood' || ground === 'mistwell')) break;
      }
    }
  }
  return out;
}

/** Shrines a seat is standing on. */
export function shrinesHeld(state, seatIndex) {
  return state.pieces.filter((p) =>
    p.alive && p.seat === seatIndex
    && state.terrain[idx(state.size, p.x, p.y)] === 'shrine').length;
}

function say(state, line) {
  state.log.unshift({ round: state.round, line });
  if (state.log.length > 80) state.log.pop();
}

/** Move a piece. Returns what happened, or null if the move was not legal. */
export function applyMove(state, pieceId, x, y) {
  if (state.over) return null;
  const piece = state.pieces.find((p) => p.id === pieceId);
  if (!piece || !piece.alive || piece.seat !== state.turn) return null;
  if (state.extraFor && state.extraFor !== pieceId) return null;
  const legal = legalMoves(state, piece).find((m) => m.x === x && m.y === y);
  if (!legal) return null;

  const seat = state.seats[piece.seat];
  const host = hostById[seat.hostId];
  const target = legal.takes ? state.pieces.find((p) => p.id === legal.takes) : null;
  const result = { took: null, martyr: false, eliminated: [] };

  if (target) {
    target.alive = false;
    result.took = target;
    const theirHost = hostById[state.seats[target.seat].hostId];
    const aName = `${host.short} ${rankName(seat, piece)}`;
    const bName = `${theirHost.short} ${rankName(state.seats[target.seat], target)}`;
    if (target.traits.includes('martyr')) {
      piece.alive = false;
      result.martyr = true;
      say(state, LOG_LINES.martyr(aName, bName));
    } else {
      say(state, LOG_LINES.take(aName, bName));
    }
  }

  if (piece.alive) { piece.x = x; piece.y = y; }

  // A host without a Lord leaves the field, and everything it had goes with it.
  for (const s of state.seats) {
    if (!s.alive) continue;
    const hasLord = state.pieces.some((p) => p.alive && p.seat === s.i && p.role === 'lord');
    if (!hasLord) {
      s.alive = false;
      for (const p of state.pieces) if (p.seat === s.i) p.alive = false;
      say(state, LOG_LINES.lost(hostById[s.hostId].name));
      result.eliminated.push(s.i);
    }
  }

  remember(state, piece.seat);

  // The Nightmare moves twice. It may also stop, which is why this is an
  // offer rather than a second compulsory move.
  if (piece.alive && piece.traits.includes('double') && state.extraFor !== pieceId) {
    state.extraFor = pieceId;
    return result;
  }
  state.extraFor = null;

  seat.movesLeft -= 1;
  if (seat.movesLeft <= 0) endTurn(state);
  else checkOver(state);
  return result;
}

/** Give up the rest of a turn. */
export function endTurn(state) {
  if (state.over) return;
  state.extraFor = null;
  const living = state.seats.filter((s) => s.alive);
  if (living.length <= 1) return checkOver(state);

  let guard = 0;
  do {
    state.turn = (state.turn + 1) % state.seats.length;
    if (state.turn === 0) state.round += 1;
  } while (!state.seats[state.turn].alive && guard++ < 20);

  beginTurn(state);
  checkOver(state);
}

function beginTurn(state) {
  const seat = state.seats[state.turn];
  if (!seat) return;
  const shrines = shrinesHeld(state, state.turn);
  seat.movesLeft = shrines >= 2 ? 2 : 1;
  state.extraFor = null;
  remember(state, state.turn);
}

function checkOver(state) {
  if (state.over) return state.over;
  const living = state.seats.filter((s) => s.alive);
  if (living.length === 1) {
    state.over = { winner: living[0].i, reason: 'last' };
    say(state, LOG_LINES.win(hostById[living[0].hostId].name));
  } else if (living.length === 0) {
    state.over = { winner: null, reason: 'none' };
    say(state, LOG_LINES.draw);
  } else if (state.round > state.limit) {
    // The mist outlasts everyone. Ground held decides it, then bodies.
    const ranked = [...living].sort((a, b) =>
      shrinesHeld(state, b.i) - shrinesHeld(state, a.i)
      || state.pieces.filter((p) => p.alive && p.seat === b.i).length
       - state.pieces.filter((p) => p.alive && p.seat === a.i).length);
    state.over = { winner: ranked[0].i, reason: 'limit' };
    say(state, LOG_LINES.win(hostById[ranked[0].hostId].name));
  }
  return state.over;
}

/** Everything a seat is allowed to do right now. */
export function movesForSeat(state, seatIndex) {
  const out = [];
  for (const p of state.pieces) {
    if (!p.alive || p.seat !== seatIndex) continue;
    if (state.extraFor && state.extraFor !== p.id) continue;
    for (const m of legalMoves(state, p)) out.push({ piece: p, ...m });
  }
  return out;
}

export const livingOf = (state, seatIndex) =>
  state.pieces.filter((p) => p.alive && p.seat === seatIndex);

// ─── playing it across several devices ──────────────────────────────────────
// Everything below exists so a war can be held on a server while each phone
// is told only what its own host can see. It is the same fog as the hot-seat
// game, enforced at the wire instead of by politeness.

/**
 * What one seat is allowed to know.
 *
 * Ground it has never seen is sent as open, not as a wall, so a host may
 * always walk into the dark. What is really there is settled by the server
 * when the move lands, which is what resolveMove is for.
 */
export function viewFor(state, seatIndex) {
  const seeAll = seatIndex === null || seatIndex === undefined;
  const vis = seeAll ? null : visibleTo(state, seatIndex);
  const seat = seeAll ? null : state.seats[seatIndex];
  const shown = seeAll
    ? state.pieces.filter((p) => p.alive)
    : piecesVisibleTo(state, seatIndex, vis);

  const terrain = state.terrain.map((t, i) =>
    seeAll || seat.seen[i] ? t : 'open');
  const known = seeAll
    ? state.terrain.map(() => 1)
    : Array.from(seat.seen);
  const lit = seeAll ? known : Array.from(vis);

  return {
    seed: state.seed, size: state.size, terrain, known, lit,
    pieces: shown.map((p) => ({
      id: p.id, seat: p.seat, role: p.role, glyph: p.glyph,
      sight: p.sight, traits: p.traits, move: p.move, x: p.x, y: p.y, alive: true,
    })),
    seats: state.seats.map((s) => ({
      i: s.i, hostId: s.hostId, kind: s.kind, name: s.name, alive: s.alive,
      movesLeft: s.movesLeft,
      standing: state.pieces.filter((p) => p.alive && p.seat === s.i).length,
      shrines: shrinesHeld(state, s.i),
      taken: !!s.taken,
    })),
    turn: state.turn, round: state.round, extraFor: state.extraFor,
    log: state.log, over: state.over, you: seeAll ? null : seatIndex,
  };
}

/**
 * Where a move actually ends up, once the fog is taken into account.
 *
 * A host aiming into ground it cannot see is aiming at a guess. A piece that
 * slides stops at the first thing it meets on the way, which may be a crag
 * nobody had seen or an enemy nobody had found. A piece that steps or leaps
 * either lands or does not, and learns something either way.
 *
 * Returns {x, y, takes} for the square it truly reaches, or null if the move
 * cannot be made at all.
 */
export function resolveMove(state, piece, tx, ty) {
  if (!piece || !piece.alive) return null;
  const { size } = state;
  const legal = legalMoves(state, piece).find((m) => m.x === tx && m.y === ty);
  if (legal) return legal;

  // Not legal in truth. For a slider, walk as far along that line as it can
  // actually get, which is the honest result of charging into fog.
  if (piece.move.kind !== 'slide') return null;
  const dx = Math.sign(tx - piece.x), dy = Math.sign(ty - piece.y);
  if (!dx && !dy) return null;
  const straight = (dx === 0 || dy === 0 || Math.abs(tx - piece.x) === Math.abs(ty - piece.y));
  if (!straight) return null;
  const allowed = piece.move.dirs.some(([ax, ay]) => ax === dx && ay === dy);
  if (!allowed) return null;

  const reach = legalMoves(state, piece)
    .filter((m) => Math.sign(m.x - piece.x) === dx && Math.sign(m.y - piece.y) === dy)
    .sort((a, b) => cheb(piece.x, piece.y, b.x, b.y) - cheb(piece.x, piece.y, a.x, a.y));
  return reach[0] || null;
}

/** Take a seat's turn from a move that may have been aimed into the dark. */
export function submitMove(state, seatIndex, pieceId, x, y) {
  if (state.over) return { ok: false, why: 'over' };
  if (state.turn !== seatIndex) return { ok: false, why: 'not your turn' };
  const piece = state.pieces.find((p) => p.id === pieceId);
  if (!piece || !piece.alive || piece.seat !== seatIndex) return { ok: false, why: 'not your piece' };
  if (state.extraFor && state.extraFor !== pieceId) return { ok: false, why: 'the Nightmare is still riding' };
  const landing = resolveMove(state, piece, x, y);
  if (!landing) return { ok: false, why: 'blocked', bumped: true };
  const result = applyMove(state, pieceId, landing.x, landing.y);
  if (!result) return { ok: false, why: 'blocked' };
  return { ok: true, landing, result, short: landing.x !== x || landing.y !== y };
}

/** Pack a game for storage, and get it back again. Uint8Arrays do not survive JSON. */
export function pack(state) {
  return JSON.stringify({
    ...state,
    seats: state.seats.map((s) => ({ ...s, seen: Array.from(s.seen) })),
  });
}

export function unpack(text) {
  const raw = typeof text === 'string' ? JSON.parse(text) : text;
  return {
    ...raw,
    seats: raw.seats.map((s) => ({ ...s, seen: Uint8Array.from(s.seen) })),
  };
}
