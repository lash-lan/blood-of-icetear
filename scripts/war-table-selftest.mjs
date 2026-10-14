// Checks the War Table is really chess, and that the mist really hides.
//
// Run: node scripts/war-table-selftest.mjs

import {
  newGame, movesFrom, allMoves, play, visible, viewFor, material,
  sq, nameOf, BANNERS, bannerById, VALUE, kingOf,
} from '../src/lib/war-table.js';
import { chooseMove, SKILLS } from '../src/lib/war-table-ai.js';

let fails = 0;
const fail = (m) => { fails += 1; console.log(`  FAIL  ${m}`); };
const ok = (c, m) => { if (!c) fail(m); };
const section = (t) => console.log(`\n${t}`);

const empty = () => {
  const g = newGame();
  g.board = new Array(64).fill(null);
  return g;
};
const put = (g, at, side, type, moved = false) => {
  const p = { id: Math.floor(Math.random() * 1e6), side, type, moved };
  g.board[at] = p;
  return p;
};

// ── it is chess ─────────────────────────────────────────────────────────────
section('The opening position');
{
  const g = newGame();
  ok(g.board.filter(Boolean).length === 32, 'a chess game starts with 32 pieces');
  ok(g.board.filter((p) => p && p.type === 'p').length === 16, 'there should be 16 pawns');
  ok(g.turn === 'w', 'white moves first');
  ok(allMoves(g, 'w').length === 20, `white should have 20 opening moves, had ${allMoves(g, 'w').length}`);
  ok(allMoves(g, 'b').length === 20, 'black should have 20 opening moves');
  ok(nameOf(sq(0, 7)) === 'a1' && nameOf(sq(7, 0)) === 'h8', 'the board is lettered wrongly');
}

section('How the pieces move');
{
  const g = empty();
  put(g, sq(3, 3), 'w', 'n');
  ok(movesFrom(g, sq(3, 3)).length === 8, 'a knight in the open has eight moves');

  const b = empty();
  put(b, sq(3, 3), 'w', 'b');
  ok(movesFrom(b, sq(3, 3)).length === 13, 'a bishop on d5 has thirteen moves');

  const r = empty();
  put(r, sq(3, 3), 'w', 'r');
  ok(movesFrom(r, sq(3, 3)).length === 14, 'a rook in the open has fourteen moves');

  const q = empty();
  put(q, sq(3, 3), 'w', 'q');
  ok(movesFrom(q, sq(3, 3)).length === 27, 'a queen on d5 has twenty-seven moves');

  // A piece does not walk through its own side, and does take the other.
  const blocked = empty();
  put(blocked, sq(0, 7), 'w', 'r');
  put(blocked, sq(0, 5), 'w', 'p');
  ok(movesFrom(blocked, sq(0, 7)).every((m) => m.to !== sq(0, 4)), 'a rook walked through its own pawn');
  const take = empty();
  put(take, sq(0, 7), 'w', 'r');
  put(take, sq(0, 5), 'b', 'p');
  const ms = movesFrom(take, sq(0, 7));
  ok(ms.some((m) => m.to === sq(0, 5) && m.takes), 'a rook could not take the piece in its way');
  ok(ms.every((m) => m.to !== sq(0, 4)), 'a rook took a piece and kept going');
}

section('Pawns');
{
  const g = newGame();
  const e2 = sq(4, 6);
  const m = movesFrom(g, e2);
  ok(m.length === 2, 'a pawn on its home square has two moves');
  ok(m.some((q) => q.double), 'a pawn cannot make its double step');

  // It may not take straight ahead.
  const front = empty();
  put(front, sq(4, 4), 'w', 'p');
  put(front, sq(4, 3), 'b', 'p');
  ok(movesFrom(front, sq(4, 4)).length === 0, 'a pawn took a piece directly in front of it');

  // En passant, there and then gone.
  const ep = empty();
  put(ep, sq(4, 3), 'w', 'p', true);
  put(ep, sq(3, 1), 'b', 'p');
  ep.turn = 'b';
  play(ep, sq(3, 1), sq(3, 3));
  const epm = movesFrom(ep, sq(4, 3));
  ok(epm.some((q) => q.passant && q.to === sq(3, 2)), 'en passant was not offered');
  play(ep, sq(4, 3), sq(3, 2));
  ok(!ep.board[sq(3, 3)], 'en passant did not remove the pawn it took');

  // Promotion.
  const pr = empty();
  put(pr, sq(0, 1), 'w', 'p', true);
  put(pr, sq(7, 7), 'w', 'k');
  put(pr, sq(7, 0), 'b', 'k');
  play(pr, sq(0, 1), sq(0, 0), 'q');
  ok(pr.board[sq(0, 0)].type === 'q', 'a pawn reached the far rank and stayed a pawn');
}

section('Castling');
{
  const g = empty();
  put(g, sq(4, 7), 'w', 'k');
  put(g, sq(7, 7), 'w', 'r');
  put(g, sq(0, 7), 'w', 'r');
  const m = movesFrom(g, sq(4, 7));
  ok(m.filter((q) => q.castle !== undefined).length === 2, 'both castles should be offered');
  play(g, sq(4, 7), sq(6, 7));
  ok(g.board[sq(6, 7)] && g.board[sq(6, 7)].type === 'k', 'the king did not arrive');
  ok(g.board[sq(5, 7)] && g.board[sq(5, 7)].type === 'r', 'the rook did not come round with it');

  const moved = empty();
  const k = put(moved, sq(4, 7), 'w', 'k');
  put(moved, sq(7, 7), 'w', 'r');
  k.moved = true;
  ok(movesFrom(moved, sq(4, 7)).every((q) => q.castle === undefined), 'a king that had moved was allowed to castle');

  const inTheWay = empty();
  put(inTheWay, sq(4, 7), 'w', 'k');
  put(inTheWay, sq(7, 7), 'w', 'r');
  put(inTheWay, sq(6, 7), 'w', 'n');
  ok(movesFrom(inTheWay, sq(4, 7)).every((q) => q.castle !== 7), 'castled straight through a knight');
}

// ── the mist ────────────────────────────────────────────────────────────────
section('The mist');
{
  const g = newGame();
  const w = visible(g, 'w');
  // Its own half, and the rank it can reach. Nothing on black's back two.
  for (let i = 0; i < 16; i++) ok(!w[i], `white can see ${nameOf(i)} at the start, and should not`);
  for (let i = 48; i < 64; i++) ok(w[i], `white cannot see its own ${nameOf(i)}`);
  ok(w[sq(0, 5)], 'white cannot see the square its own pawn may step to');
  ok(w[sq(0, 2)] === 0, 'white can see too far up the board');

  const view = viewFor(g, 'w');
  const fogged = view.squares.filter((s) => s.fog).length;
  ok(fogged > 16, `only ${fogged} squares are in mist at the start, which is too few`);
  // Nothing black owns may appear in a white view unless white can see it.
  view.squares.forEach((s, i) => {
    if (s.fog) ok(!s.piece, 'a fogged square was sent with a piece on it');
    if (s.piece && s.piece.side === 'b') ok(w[i], `a black piece on ${nameOf(i)} leaked into white's view`);
  });
  // The spectator view hides nothing, which is what a finished game shows.
  ok(viewFor(g, null).squares.every((s) => !s.fog), 'the spectator view was fogged');
}

section('A King is taken, not trapped');
{
  const g = empty();
  put(g, sq(4, 7), 'w', 'k');
  put(g, sq(4, 0), 'b', 'k');
  put(g, sq(0, 0), 'w', 'r', true);
  ok(!g.over, 'the game was over before it began');
  // White may move into danger, because white cannot be told about it.
  play(g, sq(0, 0), sq(4, 0));
  ok(g.over && g.over.winner === 'w' && g.over.reason === 'king', 'taking the King did not end it');
}

section('The Captains play fair');
{
  // Put a black piece where white cannot see it, move it, and check the
  // Captain playing white does not notice.
  const g = newGame();
  play(g, sq(4, 6), sq(4, 4));          // 1. e4
  const first = chooseMove(g, 'b', 'warlord', () => 0.5);
  g.turn = 'b';
  const hidden = g.board[sq(0, 6)];      // a white pawn black cannot see
  const seenByBlack = visible(g, 'b');
  if (hidden && !seenByBlack[sq(0, 6)]) {
    g.board[sq(0, 6)] = null;
    g.board[sq(1, 6)] = hidden;          // shuffle it inside the mist
    const second = chooseMove(g, 'b', 'warlord', () => 0.5);
    ok(first && second && first.from === second.from && first.to === second.to,
       'a Captain changed its mind over a piece it could not see');
    g.board[sq(1, 6)] = null;
    g.board[sq(0, 6)] = hidden;
  } else {
    console.log('  note  nothing was hidden from black here, fairness untested');
  }
}

section('The Captain leaves the board as it found it');
{
  const g = newGame();
  const before = JSON.stringify(g.board.map((p) => p && [p.side, p.type, p.moved]));
  chooseMove(g, 'w', 'warlord');
  const after = JSON.stringify(g.board.map((p) => p && [p.side, p.type, p.moved]));
  ok(before === after, 'looking ahead left the board changed');
}

section('Games that finish');
for (const skill of SKILLS) {
  for (let seed = 0; seed < 4; seed++) {
    const g = newGame(BANNERS[seed % 5].id, BANNERS[(seed + 1) % 5].id);
    let n = 0;
    let r = seed * 7 + 1;
    const rnd = () => { r = (r * 1103515245 + 12345) & 0x7fffffff; return r / 0x7fffffff; };
    while (!g.over && n < 700) {
      const m = chooseMove(g, g.turn, skill, rnd);
      if (!m) break;
      const done = play(g, m.from, m.to);
      ok(done !== null, `${skill} chose a move the rules refused`);
      n += 1;
    }
    ok(g.over, `${skill}, game ${seed}: still unfinished after ${n} moves`);
    ok(g.board.filter((p) => p && p.type === 'k').length <= 2, 'kings multiplied');
  }
}

section('The banners');
ok(BANNERS.length === 5, 'there should be five banners');
for (const b of BANNERS) {
  for (const r of ['k', 'q', 'r', 'b', 'n', 'p']) ok(b.ranks[r], `${b.id} has no name for the ${r}`);
  ok(/^#[0-9a-f]{6}$/i.test(b.colour), `${b.id} has no colour`);
}

console.log(fails ? `\n${fails} failure${fails === 1 ? '' : 's'}.` : '\nAll checks passed.');
process.exit(fails ? 1 : 0);
