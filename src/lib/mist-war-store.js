// Where a war is kept while it is being fought across several phones.
//
// One table in the same small Cloudflare D1 the plan uses, because a war is a
// single JSON record with a version number on it and does not deserve a
// database of its own. The table creates itself on first use.
//
// The rule this file exists to enforce: the server holds the whole board, and
// hands each phone only what its own host can see. Nothing here trusts the
// client with anything except its own token.

import { env } from 'cloudflare:workers';
import { createGame, pack, unpack, viewFor, submitMove, endTurn } from './mist-war.js';
import { chooseMove } from './mist-war-ai.js';
import { HOSTS } from '../data/mist-war.js';

// No vowels and no look-alikes, so a code can be read down a phone line.
const ALPHABET = 'BCDFGHJKLMNPQRSTVWXZ23456789';
const LIFETIME = 1000 * 60 * 60 * 24;     // a day, then the mist takes it back

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function db() {
  const d = env.PLAN_DB;
  if (!d) throw new Error('The war table is not connected to this site yet.');
  return d;
}

let ready = false;
async function ensure() {
  if (ready) return;
  await db().prepare(`CREATE TABLE IF NOT EXISTS mist_war (
    code TEXT PRIMARY KEY,
    version INTEGER NOT NULL,
    state TEXT NOT NULL,
    seats TEXT NOT NULL,
    started INTEGER NOT NULL DEFAULT 0,
    updated INTEGER NOT NULL
  )`).run();
  ready = true;
}

const rand = (n) => {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return [...a].map((b) => ALPHABET[b % ALPHABET.length]).join('');
};
const token = () => {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
};

async function freeCode() {
  for (let i = 0; i < 12; i++) {
    const code = rand(4);
    const row = await db().prepare('SELECT code FROM mist_war WHERE code = ?1').bind(code).first();
    if (!row) return code;
  }
  return rand(6);
}

/** Older wars are swept now and then, so the table never grows without end. */
async function sweep() {
  await db().prepare('DELETE FROM mist_war WHERE updated < ?1').bind(Date.now() - LIFETIME).run();
}

async function read(code) {
  await ensure();
  const row = await db().prepare('SELECT * FROM mist_war WHERE code = ?1').bind(String(code || '').toUpperCase()).first();
  if (!row) return null;
  return { ...row, state: unpack(row.state), seats: JSON.parse(row.seats) };
}

async function write(war) {
  await db().prepare(
    'UPDATE mist_war SET version = ?2, state = ?3, seats = ?4, started = ?5, updated = ?6 WHERE code = ?1',
  ).bind(war.code, war.version, pack(war.state), JSON.stringify(war.seats), war.started ? 1 : 0, Date.now()).run();
}

/** Who a token is, or nobody. */
const seatOf = (war, tok) => war.seats.findIndex((s) => s.token && s.token === tok);

/** All open seats taken? */
const allSeated = (war) => war.seats.every((s) => s.kind !== 'open');

/**
 * Start a war. `want` is the seat list the caller chose:
 *   [{ hostId, kind: 'you' | 'open' | 'recruit' | 'captain' | 'warlord' }]
 */
export async function create(want) {
  await ensure();
  await sweep();

  const chosen = (want || [])
    .filter((s) => HOSTS.some((h) => h.id === s.hostId))
    .slice(0, 5);
  if (chosen.length < 2) return { error: 'Two banners at least, or there is nobody to fight.' };
  if (new Set(chosen.map((s) => s.hostId)).size !== chosen.length) {
    return { error: 'A banner cannot be in the field twice.' };
  }
  if (!chosen.some((s) => s.kind === 'you')) return { error: 'You have to take a banner yourself.' };

  const code = await freeCode();
  const seed = Math.floor(Math.random() * 1e9);
  const state = createGame(chosen.map((s) => ({
    hostId: s.hostId,
    kind: s.kind === 'recruit' || s.kind === 'captain' || s.kind === 'warlord' ? 'captain' : 'human',
    name: HOSTS.find((h) => h.id === s.hostId).short,
  })), seed);

  const seats = chosen.map((s, i) => ({
    i, hostId: s.hostId,
    kind: s.kind === 'you' ? 'human' : s.kind === 'open' ? 'open' : 'captain',
    skill: ['recruit', 'captain', 'warlord'].includes(s.kind) ? s.kind : null,
    token: s.kind === 'you' ? token() : null,
  }));
  state.seats.forEach((s, i) => { s.skill = seats[i].skill; });

  const war = { code, version: 1, state, seats, started: allSeated({ seats }) };
  await db().prepare(
    'INSERT INTO mist_war (code, version, state, seats, started, updated) VALUES (?1, ?2, ?3, ?4, ?5, ?6)',
  ).bind(code, 1, pack(state), JSON.stringify(seats), war.started ? 1 : 0, Date.now()).run();

  if (war.started) await runCaptains(war);
  const mine = seats.findIndex((s) => s.token);
  return { code, token: seats[mine].token, seat: mine };
}

/** Take one of the banners nobody is holding. */
export async function join(code, hostId) {
  const war = await read(code);
  if (!war) return { error: 'No war is being fought under that code.' };
  const i = war.seats.findIndex((s) => s.kind === 'open' && (!hostId || s.hostId === hostId));
  if (i < 0) return { error: 'Every banner in that war is already held.' };
  war.seats[i].kind = 'human';
  war.seats[i].token = token();
  war.state.seats[i].kind = 'human';
  war.version += 1;
  war.started = allSeated(war);
  await write(war);
  if (war.started) { await runCaptains(war); }
  return { code: war.code, token: war.seats[i].token, seat: i };
}

/** Let every Captain in a row take its turn, then save. */
async function runCaptains(war, limit = 40) {
  let moved = false;
  for (let n = 0; n < limit; n++) {
    const st = war.state;
    if (st.over) break;
    const seat = war.seats[st.turn];
    if (!seat || seat.kind !== 'captain' || !st.seats[st.turn].alive) break;
    const move = chooseMove(st, st.turn, seat.skill || 'captain');
    if (move) submitMove(st, st.turn, move.piece.id, move.x, move.y);
    else endTurn(st);
    moved = true;
  }
  if (moved) { war.version += 1; await write(war); }
  return moved;
}

/** What one phone is allowed to see, plus how the lobby stands. */
export async function look(code, tok) {
  const war = await read(code);
  if (!war) return { error: 'No war is being fought under that code.' };
  const me = seatOf(war, tok);
  // A Captain may be waiting on nothing but the clock, so nudge it on a look.
  if (war.started && !war.state.over) {
    const seat = war.seats[war.state.turn];
    if (seat && seat.kind === 'captain') await runCaptains(war);
  }
  return {
    code: war.code,
    version: war.version,
    started: !!war.started,
    you: me < 0 ? null : me,
    lobby: war.seats.map((s) => ({
      i: s.i, hostId: s.hostId, kind: s.kind, skill: s.skill, held: !!s.token,
    })),
    view: me < 0 ? null : viewFor(war.state, me),
  };
}

/** Move a piece, or stop. */
export async function act(code, tok, body) {
  const war = await read(code);
  if (!war) return { error: 'No war is being fought under that code.' };
  if (!war.started) return { error: 'The hosts are still gathering.' };
  const me = seatOf(war, tok);
  if (me < 0) return { error: 'You hold no banner in that war.' };
  if (war.state.turn !== me) return { error: 'It is not your turn.' };

  let note = null;
  if (body.action === 'end') {
    endTurn(war.state);
  } else {
    const out = submitMove(war.state, me, Number(body.pieceId), Number(body.x), Number(body.y));
    if (!out.ok) return { error: out.why === 'blocked' ? 'Something in the mist stopped it.' : out.why, version: war.version };
    if (out.short) note = 'Something in the mist stopped it short.';
  }
  war.version += 1;
  await write(war);
  await runCaptains(war);
  return { ...(await look(code, tok)), note };
}
