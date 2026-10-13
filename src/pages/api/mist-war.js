// The Mist War, held on the server so it can be fought across several phones.
//
// One endpoint. The server owns the board and every phone is told only what
// its own host can see, so the fog cannot be lifted by reading the traffic.
// A seat is proved by the token handed out when it was taken, and nothing
// else is trusted.
//
//   GET  /api/mist-war?code=ABCD&token=…            what you may see
//   POST { action: 'create', seats: [...] }          start one
//   POST { action: 'join', code, hostId }            take a free banner
//   POST { action: 'move', code, token, pieceId, x, y }
//   POST { action: 'end',  code, token }

import { create, join, look, act, json } from '../../lib/mist-war-store.js';

export const prerender = false;

export async function GET({ url }) {
  const code = url.searchParams.get('code');
  const token = url.searchParams.get('token');
  if (!code) return json({ error: 'Which war?' }, 400);
  try {
    const out = await look(code, token);
    return json(out, out.error ? 404 : 200);
  } catch (err) {
    return json({ error: err.message || 'The war could not be read.' }, 503);
  }
}

export async function POST({ request }) {
  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Could not read that request.' }, 400); }

  try {
    if (body.action === 'create') {
      const out = await create(body.seats);
      return json(out, out.error ? 400 : 200);
    }
    if (body.action === 'join') {
      const out = await join(body.code, body.hostId);
      return json(out, out.error ? 400 : 200);
    }
    if (body.action === 'move' || body.action === 'end') {
      if (!body.code || !body.token) return json({ error: 'Which war, and who are you?' }, 400);
      const out = await act(body.code, body.token, body);
      return json(out, out.error ? 400 : 200);
    }
    return json({ error: 'That is not something a war can be asked to do.' }, 400);
  } catch (err) {
    return json({ error: err.message || 'The war could not be changed.' }, 503);
  }
}
