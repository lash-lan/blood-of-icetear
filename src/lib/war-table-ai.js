// The War Table — the Captain across the board.
//
// Held to the same mist as a player. It reasons only from the squares its own
// side can see, which means it can walk into a piece it had no way of
// knowing was there, exactly as you can. That is the game, and the self-test
// checks it by moving a piece it cannot see and proving it does not react.

import { movesFrom, allMoves, visible, VALUE, sq, onBoard, at } from './war-table.js';

const other = (s) => (s === 'w' ? 'b' : 'w');

// How much a square is worth standing on. The middle of the table is worth
// more than the edges, and it is worth more to a Knight than to a Rook.
const CENTRE = [
  0, 1, 2, 3, 3, 2, 1, 0,
  1, 2, 3, 4, 4, 3, 2, 1,
  2, 3, 4, 5, 5, 4, 3, 2,
  3, 4, 5, 6, 6, 5, 4, 3,
  3, 4, 5, 6, 6, 5, 4, 3,
  2, 3, 4, 5, 5, 4, 3, 2,
  1, 2, 3, 4, 4, 3, 2, 1,
  0, 1, 2, 3, 3, 2, 1, 0,
];

const SKILL = {
  recruit: { noise: 2.6, looksAhead: false, keepsKingIn: 0.2 },
  captain: { noise: 0.8, looksAhead: true, keepsKingIn: 1 },
  warlord: { noise: 0.2, looksAhead: true, keepsKingIn: 1.6 },
};
export const SKILLS = Object.keys(SKILL);

/** Squares the enemy pieces this side can actually see are able to reach. */
function threatened(g, side) {
  const seen = visible(g, side);
  const danger = new Map();
  for (let i = 0; i < 64; i++) {
    const p = g.board[i];
    if (!p || p.side === side || !seen[i]) continue;    // only enemies in view
    for (const m of movesFrom(g, i)) {
      const cheapest = danger.get(m.to);
      if (cheapest === undefined || VALUE[p.type] < cheapest) danger.set(m.to, VALUE[p.type]);
    }
  }
  return danger;
}

/**
 * Pick a move. One ply, plus a look at what the visible enemy could do back,
 * which is as far as anyone can honestly see through fog.
 */
export function chooseMove(g, side = g.turn, skill = 'captain', random = Math.random) {
  const cfg = SKILL[skill] || SKILL.captain;
  const legal = allMoves(g, side);
  if (!legal.length) return null;

  const danger = threatened(g, side);
  const myKing = g.board.findIndex((p) => p && p.side === side && p.type === 'k');
  let best = null, bestScore = -Infinity;

  for (const m of legal) {
    const p = g.board[m.from];
    let score = 0;

    // Taking something, and taking the King above all.
    if (m.takes) {
      const victim = g.board[m.to] || g.board[sq(m.to % 8, Math.floor(m.from / 8))];
      if (victim) score += victim.type === 'k' ? 1000 : VALUE[victim.type] * 10;
    }
    if (m.promote) score += 8;

    // Walking under a blade you can see.
    const risk = danger.get(m.to);
    if (risk !== undefined) {
      const gain = m.takes && g.board[m.to] ? VALUE[g.board[m.to].type] : 0;
      score -= Math.max(0, VALUE[p.type] - gain) * 6;
    }
    // Stepping out from under one.
    if (danger.has(m.from)) score += VALUE[p.type] * 3;

    // Ground.
    score += (CENTRE[m.to] - CENTRE[m.from]) * (p.type === 'n' ? 0.5 : 0.25);
    if (p.type === 'p') score += (side === 'w' ? 1 : -1) * (Math.floor(m.from / 8) - Math.floor(m.to / 8)) * 0.4;
    if (m.castle !== undefined) score += 3;

    // The King stays home while there is still a board to lose.
    if (p.type === 'k' && m.castle === undefined) score -= 2.5 * cfg.keepsKingIn;

    // What the visible enemy could do to us afterwards, if this Captain is
    // good enough to ask. The board is put back exactly as it was.
    if (cfg.looksAhead) {
      const undo = apply(g, m);
      const back = threatened(g, side);
      let worst = 0;
      for (let i = 0; i < 64; i++) {
        const q = g.board[i];
        if (!q || q.side !== side) continue;
        const r = back.get(i);
        if (r !== undefined) worst = Math.max(worst, VALUE[q.type]);
      }
      score -= worst * 2.2;
      if (myKing >= 0 && back.has(g.board.findIndex((q) => q && q.side === side && q.type === 'k'))) score -= 60;
      revert(g, undo);
    }

    score += (random() - 0.5) * cfg.noise;
    if (score > bestScore) { bestScore = score; best = m; }
  }
  return best;
}

// A move made and taken back again, so the Captain can look one step ahead
// without the real board ever changing.
function apply(g, m) {
  const moving = g.board[m.from];
  const capturedAt = m.passant ? sq(m.to % 8, Math.floor(m.from / 8)) : m.to;
  const undo = { m, moving, captured: g.board[capturedAt], capturedAt, passant: g.passant, turn: g.turn,
                 wasType: moving ? moving.type : null, wasMoved: moving ? moving.moved : false, rook: null };
  g.board[capturedAt] = null;
  g.board[m.to] = moving;
  g.board[m.from] = null;
  if (moving) moving.moved = true;
  if (m.promote && moving) moving.type = 'q';
  if (m.castle !== undefined && moving) {
    const y = Math.floor(m.from / 8);
    const rf = sq(m.castle, y), rt = sq(m.castle === 7 ? 5 : 3, y);
    undo.rook = { from: rf, to: rt, piece: g.board[rf], wasMoved: g.board[rf] && g.board[rf].moved };
    g.board[rt] = g.board[rf]; g.board[rf] = null;
    if (g.board[rt]) g.board[rt].moved = true;
  }
  return undo;
}

function revert(g, u) {
  g.board[u.m.from] = u.moving;
  g.board[u.m.to] = null;
  g.board[u.capturedAt] = u.captured;
  if (u.moving) { u.moving.type = u.wasType; u.moving.moved = u.wasMoved; }
  if (u.rook) {
    g.board[u.rook.from] = u.rook.piece;
    g.board[u.rook.to] = null;
    if (u.rook.piece) u.rook.piece.moved = u.rook.wasMoved;
  }
  g.passant = u.passant;
  g.turn = u.turn;
}
