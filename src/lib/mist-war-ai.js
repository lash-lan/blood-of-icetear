// The Mist War — the Captains who play the hosts nobody is sitting at.
//
// A Captain is held to the same fog as a player: it may only reason about
// what its own pieces can see, and about ground it has walked. It is not
// allowed to read the board. That is the whole reason this file is separate
// from the rules, and the self-test checks it.

import {
  TERRAIN, ROLES, hostById, idx, cheb, inBounds,
  visibleTo, piecesVisibleTo, legalMoves, pieceAt, canTake, sightOf,
} from './mist-war.js';

// What a piece is worth losing. The Lord is not priced, it is the game.
const VALUE = { lord: 1000, herald: 42, warden: 30, seer: 30, outrider: 30, levy: 11, unique: 36 };
const worth = (p) => VALUE[p.role] ?? 20;

const SKILL = {
  // A raw recruit blunders about. A veteran protects its Lord and takes
  // trades that are actually good.
  recruit: { noise: 26, caution: 0.25, depth: 0 },
  captain: { noise: 9, caution: 1.0, depth: 1 },
  warlord: { noise: 3, caution: 1.5, depth: 1 },
};

/**
 * Squares the enemies this seat can see are able to reach next move. Used
 * both to avoid walking into a blade and to find a square that threatens one.
 */
function dangerMap(state, seatIndex, seen) {
  const { size } = state;
  const danger = new Map();   // tile index -> the most valuable attacker
  for (const p of seen) {
    if (p.seat === seatIndex) continue;
    for (const m of legalMoves(state, p)) {
      const k = idx(size, m.x, m.y);
      const prev = danger.get(k);
      if (!prev || worth(p) < worth(prev)) danger.set(k, p);   // cheapest attacker is the real threat
    }
  }
  return danger;
}

/** Nearest tile this seat has never seen, as a pull toward the unknown. */
function nearestUnseen(state, seat, x, y) {
  const { size } = state;
  let best = Infinity;
  for (let ty = 0; ty < size; ty++) {
    for (let tx = 0; tx < size; tx++) {
      if (seat.seen[idx(size, tx, ty)]) continue;
      const d = cheb(x, y, tx, ty);
      if (d < best) best = d;
    }
  }
  return best === Infinity ? 0 : best;
}

/**
 * Choose a move for a seat. Returns {piece, x, y} or null when the host has
 * nothing legal left to do.
 */
export function chooseMove(state, seatIndex, skill = 'captain', random = Math.random) {
  const cfg = SKILL[skill] || SKILL.captain;
  const seat = state.seats[seatIndex];
  if (!seat || !seat.alive) return null;

  const vis = visibleTo(state, seatIndex);
  const seen = piecesVisibleTo(state, seatIndex, vis);
  const enemies = seen.filter((p) => p.seat !== seatIndex);
  const danger = dangerMap(state, seatIndex, seen);
  const myLord = state.pieces.find((p) => p.alive && p.seat === seatIndex && p.role === 'lord');
  const unseenLeft = seat.seen.reduce((n, v) => n + (v ? 0 : 1), 0);

  let best = null, bestScore = -Infinity;

  for (const piece of state.pieces) {
    if (!piece.alive || piece.seat !== seatIndex) continue;
    if (state.extraFor && state.extraFor !== piece.id) continue;

    const standingDanger = danger.has(idx(state.size, piece.x, piece.y));

    for (const m of legalMoves(state, piece)) {
      let score = 0;

      // ── taking something ────────────────────────────────────────────────
      if (m.takes) {
        const victim = state.pieces.find((p) => p.id === m.takes);
        score += worth(victim) * 1.6;
        if (victim.traits.includes('martyr')) score -= worth(piece) * 1.4;
      }

      // ── walking into a blade ────────────────────────────────────────────
      const threat = danger.get(idx(state.size, m.x, m.y));
      if (threat) {
        const trade = m.takes ? worth(state.pieces.find((p) => p.id === m.takes)) : 0;
        score -= (worth(piece) - trade * 0.7) * cfg.caution;
      }
      // Standing still in a threatened square is its own cost, so moving out
      // of one is worth something.
      if (standingDanger && !threat) score += worth(piece) * 0.5 * cfg.caution;

      // ── ground ──────────────────────────────────────────────────────────
      const ground = state.terrain[idx(state.size, m.x, m.y)];
      if (ground === 'shrine') score += piece.role === 'lord' ? 14 : 26;
      if (ground === 'wood' && piece.traits.includes('hidden')) score += 8;
      if (ground === 'mistwell') score -= 9;            // blind, and easily surrounded
      if (piece.role === 'lord' && ground === 'wood') score += 5;   // a Lord likes cover

      // ── closing on the enemy, or keeping away from them ─────────────────
      if (enemies.length) {
        let nearest = Infinity, nearestLord = Infinity;
        for (const e of enemies) {
          const d = cheb(m.x, m.y, e.x, e.y);
          nearest = Math.min(nearest, d);
          if (e.role === 'lord') nearestLord = Math.min(nearestLord, d);
        }
        if (piece.role === 'lord') {
          score += Math.min(nearest, 6) * 2.2 * cfg.caution;   // the Lord withdraws
        } else {
          score -= nearest * 1.3;
          if (nearestLord < Infinity) score -= nearestLord * 2.4;
        }
      } else if (piece.role !== 'lord' && unseenLeft > 0) {
        // Nothing in sight: go and look, and prefer the pieces that see best.
        score -= nearestUnseen(state, seat, m.x, m.y) * 1.1;
        score += sightOf(state, piece) * 0.8;
      }

      // ── keep the Lord company ───────────────────────────────────────────
      if (myLord && piece.role !== 'lord') {
        const d = cheb(m.x, m.y, myLord.x, myLord.y);
        if (d > Math.floor(state.size / 2)) score -= (d - Math.floor(state.size / 2)) * 1.4;
      }
      if (piece.role === 'lord' && !enemies.length) score -= 6;   // the Lord moves last

      score += (random() - 0.5) * cfg.noise;

      if (score > bestScore) { bestScore = score; best = { piece, x: m.x, y: m.y }; }
    }
  }
  return best;
}

export const SKILLS = Object.keys(SKILL);
