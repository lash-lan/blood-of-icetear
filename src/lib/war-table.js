// The War Table — ordinary chess, with Akidna's mist over the board.
//
// Everything is the chess you already know. The one change is what you are
// allowed to see: your own pieces, and every square one of them could move
// to. Everything else is mist. You are never told you are in check, because
// nobody is there to tell you, and the game ends when a King is taken rather
// than when one is trapped.
//
// Plain functions over a plain state object. Nothing here draws anything.

import { HOSTS } from '../data/mist-war.js';

// Nine files and nine ranks, not eight. An odd board has a true centre, which
// gives the King a file of his own with the Queen on one hand and the
// Champion on the other, and it gives every host one more Levy than chess
// does.
export const N = 9;

// The Champion is the piece the Tournament of Domination is named for: one
// fighter sent out ahead of the host to settle it in single combat. It steps
// or vaults up to two squares in any direction, over anything in the way, so
// it closes distance the way nothing else on the table can. In the mist that
// makes it the piece you never see coming.
const CHAMPION_STEPS = (() => {
  const out = [];
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      if (dx || dy) out.push([dx, dy]);
    }
  }
  return out;   // 24 squares, the full two-square ring, leaping over all of it
})();

// What each banner calls the fighter it sends out.
const CHAMPIONS = {
  rangers: 'Vice Captain',
  grey: 'Dragon Core Captain',
  dark: 'One of the Seven',
  beasts: 'Behemoth',
  order: 'Slayer',
};

// The five banners, borrowed from the Mist War so there is one list of hosts
// in the world, with their ranks mapped on to the chess pieces.
export const BANNERS = HOSTS.map((h) => ({
  id: h.id, name: h.name, short: h.short, colour: h.colour, ink: h.ink,
  seat: h.seat, blurb: h.blurb, cry: h.cry,
  ranks: {
    k: h.names.lord, q: h.names.herald, r: h.names.warden,
    b: h.names.seer, n: h.names.outrider, p: h.names.levy,
    c: CHAMPIONS[h.id] || 'Champion',
  },
}));
export const bannerById = Object.fromEntries(BANNERS.map((b) => [b.id, b]));

export const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟', c: '✦' };
export const VALUE = { k: 0, q: 9, r: 5, b: 3.2, n: 3, p: 1, c: 5.5 };
export const FULL = { k: 'King', q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight', p: 'Pawn', c: 'Champion' };

export const sq = (x, y) => y * N + x;
export const onBoard = (x, y) => x >= 0 && y >= 0 && x < N && y < N;
export const fileOf = (i) => 'abcdefghi'[i % N];
export const rankOf = (i) => String(N - Math.floor(i / N));
export const nameOf = (i) => fileOf(i) + rankOf(i);

// Rook, Knight, Bishop, Queen, King, Champion, Bishop, Knight, Rook. The King
// takes the true centre file, with the Queen on his left and the Champion on
// his right.
const BACK = ['r', 'n', 'b', 'q', 'k', 'c', 'b', 'n', 'r'];

/**
 * A new game. White is the side at the bottom and moves first, exactly as in
 * chess. Which banner each side carries changes the colours and the names,
 * and nothing else.
 */
export function newGame(whiteBanner = 'grey', blackBanner = 'dark') {
  const board = new Array(N * N).fill(null);
  let id = 1;
  for (let x = 0; x < N; x++) {
    board[sq(x, 0)] = { id: id++, side: 'b', type: BACK[x], moved: false };
    board[sq(x, 1)] = { id: id++, side: 'b', type: 'p', moved: false };
    board[sq(x, N - 2)] = { id: id++, side: 'w', type: 'p', moved: false };
    board[sq(x, N - 1)] = { id: id++, side: 'w', type: BACK[x], moved: false };
  }
  return {
    board,
    turn: 'w',
    banners: { w: whiteBanner, b: blackBanner },
    passant: null,        // the square a pawn may be taken on this turn only
    moves: 0,
    history: [],
    log: [],
    over: null,           // { winner: 'w'|'b'|null, reason }
    limit: 300,
  };
}

const other = (side) => (side === 'w' ? 'b' : 'w');
export const at = (g, i) => g.board[i];

/**
 * Every move a piece may make, by the ordinary rules of chess, without
 * worrying about check. Check does not exist here: you cannot see the board,
 * so you cannot be warned, and a King that is taken is simply taken.
 */
export function movesFrom(g, from) {
  const p = g.board[from];
  if (!p) return [];
  const out = [];
  const x = from % N, y = Math.floor(from / N);
  const add = (nx, ny, opts = {}) => {
    if (!onBoard(nx, ny)) return false;
    const t = g.board[sq(nx, ny)];
    if (t && t.side === p.side) return false;
    if (opts.quietOnly && t) return false;
    if (opts.takeOnly && !t && !opts.passant) return false;
    out.push({ from, to: sq(nx, ny), takes: t ? t.id : null, ...opts });
    return !t;
  };
  const ride = (dirs) => {
    for (const [dx, dy] of dirs) {
      let nx = x + dx, ny = y + dy;
      while (add(nx, ny)) { nx += dx; ny += dy; }
    }
  };
  const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  if (p.type === 'p') {
    const dir = p.side === 'w' ? -1 : 1;
    const start = p.side === 'w' ? N - 2 : 1;
    const last = p.side === 'w' ? 0 : N - 1;
    if (onBoard(x, y + dir) && !g.board[sq(x, y + dir)]) {
      out.push({ from, to: sq(x, y + dir), takes: null, promote: y + dir === last });
      if (y === start && !g.board[sq(x, y + 2 * dir)]) {
        out.push({ from, to: sq(x, y + 2 * dir), takes: null, double: true });
      }
    }
    for (const dx of [-1, 1]) {
      const nx = x + dx, ny = y + dir;
      if (!onBoard(nx, ny)) continue;
      const t = g.board[sq(nx, ny)];
      if (t && t.side !== p.side) {
        out.push({ from, to: sq(nx, ny), takes: t.id, promote: ny === last });
      } else if (!t && g.passant === sq(nx, ny)) {
        const victim = g.board[sq(nx, y)];
        if (victim && victim.side !== p.side && victim.type === 'p') {
          out.push({ from, to: sq(nx, ny), takes: victim.id, passant: true });
        }
      }
    }
  } else if (p.type === 'n') {
    for (const [dx, dy] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) {
      add(x + dx, y + dy);
    }
  } else if (p.type === 'c') {
    // Two squares in any direction, over anything in the way.
    for (const [dx, dy] of CHAMPION_STEPS) add(x + dx, y + dy);
  } else if (p.type === 'b') ride(DIAG);
  else if (p.type === 'r') ride(ORTHO);
  else if (p.type === 'q') ride([...ORTHO, ...DIAG]);
  else if (p.type === 'k') {
    for (const [dx, dy] of [...ORTHO, ...DIAG]) add(x + dx, y + dy);
    // Castling. Through an attacked square is allowed, because in the mist
    // neither player can know a square is attacked.
    if (!p.moved) {
      for (const [rookX, step, need] of [[N - 1, 1, [5, 6, 7]], [0, -1, [1, 2, 3]]]) {
        const rook = g.board[sq(rookX, y)];
        if (!rook || rook.moved || rook.type !== 'r' || rook.side !== p.side) continue;
        if (need.some((nx) => g.board[sq(nx, y)])) continue;
        out.push({ from, to: sq(x + 2 * step, y), takes: null, castle: rookX });
      }
    }
  }
  return out;
}

/** Everything the side to move may do. */
export function allMoves(g, side = g.turn) {
  const out = [];
  for (let i = 0; i < N * N; i++) {
    const p = g.board[i];
    if (p && p.side === side) out.push(...movesFrom(g, i));
  }
  return out;
}

/**
 * What a side can see. Three things, and the third is the important one:
 *
 *   the square a piece of yours is standing on,
 *   every square one of them could move to,
 *   and the ring of squares immediately around each of them.
 *
 * The ring is why a piece hemmed in by its own side is not blind, and why
 * anything that creeps up next to you is seen before it strikes. Without it
 * a Rook walled in behind its own pawns sees nothing at all, which reads as
 * a bug however correct it is.
 */
export function visible(g, side) {
  const seen = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const p = g.board[i];
    if (!p || p.side !== side) continue;
    seen[i] = 1;
    for (const m of movesFrom(g, i)) seen[m.to] = 1;
    // The ring: one square in every direction, whether it can go there or not.
    const px = i % N, py = Math.floor(i / N);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (onBoard(px + dx, py + dy)) seen[sq(px + dx, py + dy)] = 1;
      }
    }
    // A pawn watches the squares it could take on, whether or not anything
    // is standing there yet.
    if (p.type === 'p') {
      const dir = side === 'w' ? -1 : 1;
      const x = i % N, y = Math.floor(i / N);
      for (const dx of [-1, 1]) if (onBoard(x + dx, y + dir)) seen[sq(x + dx, y + dir)] = 1;
    }
  }
  return seen;
}

/**
 * Ground close enough to feel, which is two squares from any piece of yours.
 *
 * Sight tells you what a thing is. This only tells you that a thing is there.
 * An enemy standing on a sensed square but not a seen one shows as a shape
 * with no face and no banner, so you know something is coming and not what.
 */
export function sensed(g, side, reach = 2) {
  const out = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const p = g.board[i];
    if (!p || p.side !== side) continue;
    const px = i % N, py = Math.floor(i / N);
    for (let dy = -reach; dy <= reach; dy++) {
      for (let dx = -reach; dx <= reach; dx++) {
        if (onBoard(px + dx, py + dy)) out[sq(px + dx, py + dy)] = 1;
      }
    }
  }
  return out;
}

/** The board as one side is allowed to know it. */
export function viewFor(g, side) {
  const seen = side ? visible(g, side) : new Uint8Array(N * N).fill(1);
  const felt = side ? sensed(g, side) : new Uint8Array(N * N);
  return {
    squares: Array.from({ length: N * N }, (_, i) => {
      const p = g.board[i];
      if (seen[i]) return { fog: false, piece: p ? { id: p.id, side: p.side, type: p.type } : null };
      // Close enough to feel, far enough that it is only a shape. The id goes
      // with it so the shape can slide rather than blink, but the type does
      // not, because that is the part you are not allowed to know.
      if (felt[i] && p && p.side !== side) return { fog: false, shadow: true, piece: { id: p.id } };
      return { fog: true };
    }),
    seen: Array.from(seen),
    felt: Array.from(felt),
    turn: g.turn, banners: g.banners, moves: g.moves,
    over: g.over, log: g.log, you: side || null,
    taken: g.history.filter((h) => h.takenType).map((h) => ({ side: other(h.side), type: h.takenType })),
  };
}

const say = (g, line) => { g.log.unshift({ n: g.moves + 1, line }); if (g.log.length > 60) g.log.pop(); };

/** Play a move. Returns what happened, or null if it was not legal. */
export function play(g, from, to, promoteTo = 'q') {
  if (g.over) return null;
  const p = g.board[from];
  if (!p || p.side !== g.turn) return null;
  const m = movesFrom(g, from).find((q) => q.to === to);
  if (!m) return null;

  const banner = bannerById[g.banners[p.side]];
  const victim = m.passant
    ? g.board[sq(to % N, Math.floor(from / N))]
    : g.board[to];

  const event = { side: p.side, from, to, type: p.type, takenType: victim ? victim.type : null };

  if (victim) {
    const theirs = bannerById[g.banners[victim.side]];
    g.board[m.passant ? sq(to % N, Math.floor(from / N)) : to] = null;
    say(g, `${banner.short} ${banner.ranks[p.type]} takes ${theirs.short} ${theirs.ranks[victim.type]} on ${nameOf(to)}.`);
    if (victim.type === 'k') {
      g.over = { winner: p.side, reason: 'king' };
    }
  }

  g.board[to] = p;
  g.board[from] = null;
  p.moved = true;

  if (m.castle !== undefined) {
    const y = Math.floor(from / N);
    const rookFrom = sq(m.castle, y);
    const rookTo = sq(m.castle === N - 1 ? 5 : 3, y);
    const rook = g.board[rookFrom];
    g.board[rookTo] = rook; g.board[rookFrom] = null;
    if (rook) rook.moved = true;
    event.castle = { from: rookFrom, to: rookTo };
    say(g, `${banner.short} castles.`);
  }

  if (m.promote) { p.type = promoteTo; event.promoted = promoteTo; say(g, `A ${banner.ranks.p} reaches the far rank and becomes a ${banner.ranks[promoteTo]}.`); }

  g.passant = m.double ? sq(to % N, (Math.floor(from / N) + Math.floor(to / N)) / 2) : null;
  g.moves += 1;
  g.history.push(event);
  g.turn = other(g.turn);

  if (!g.over) {
    // A side with nothing legal left has been shut in, and loses the table.
    if (!allMoves(g, g.turn).length) {
      g.over = { winner: other(g.turn), reason: 'shut in' };
    } else if (g.moves >= g.limit) {
      const score = (side) => g.board.reduce((n, q) => n + (q && q.side === side ? VALUE[q.type] : 0), 0);
      const w = score('w'), b = score('b');
      g.over = { winner: w === b ? null : (w > b ? 'w' : 'b'), reason: 'the mist outlasts them' };
    }
  }
  return event;
}

/** Material left on the table, for the side bar and for the Captain. */
export const material = (g, side) =>
  g.board.reduce((n, p) => n + (p && p.side === side ? VALUE[p.type] : 0), 0);

export const kingOf = (g, side) =>
  g.board.findIndex((p) => p && p.side === side && p.type === 'k');
