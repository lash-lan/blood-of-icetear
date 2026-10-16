// The plan's service worker. It exists so the plan can be installed to a home
// screen and opened like an app, which Android requires a worker for, and so
// the app loads fast on a bad connection.
//
// It lives at the root rather than inside /plan/ on purpose: a worker may only
// control pages below its own folder, and the plan's own pages are both /plan
// and /plan/..., so only a worker served from the root can cover all of them.
// The registration narrows it to /plan, so the rest of the site is untouched.
//
// What it caches, and what it deliberately does not:
//   - Page loads always go to the network. A stale copy of the plan is worse
//     than none, and the lock screen must never be served from a cache.
//   - The build's own files (/_astro/...) carry their version in their name,
//     so once fetched they can be reused forever and the app opens instantly.
//   - Everything under /api/ is left completely alone: your records are only
//     ever read from, and written to, the real database.

const CACHE = 'plan-shell-v1';
const OFFLINE = '/plan-offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.add(OFFLINE))
      .catch(() => {})
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('plan-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Files whose name changes whenever their contents change, so never stale. */
const versioned = (url) =>
  url.origin === self.location.origin
    ? url.pathname.startsWith('/_astro/')
    : url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com';

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;

  // A page load: always the real thing, and the offline note if there is no network.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() =>
        caches.match(OFFLINE).then((hit) => hit ?? Response.error()),
      ),
    );
    return;
  }

  if (!versioned(url)) return;

  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((res) => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        }
        return res;
      });
    }),
  );
});
