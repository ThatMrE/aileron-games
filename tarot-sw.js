/* Wetware Arcana PWA service worker.
   Registered with scope "/tarot.html" so it coexists with the site's other
   app service workers (dice-sw.js at scope "/", weji-sw.js at "/weji.html",
   punbearable-sw.js at "/punbearable.html"): the most specific scope controls
   the tarot page, and cache cleanup below only touches "tarot-" caches so a
   neighbour's cache is never evicted.

   The deck is generated entirely in the page — no card art or data is fetched
   at runtime — so precaching the document and its icons is enough to make the
   installed app fully offline, deck generator and all.

   Bump CACHE_VERSION whenever the precached assets change. */
const CACHE_VERSION = 'tarot-v1';
const PRECACHE = [
  '/tarot.html',
  '/tarot.webmanifest',
  '/icons/tarot-192.png',
  '/icons/tarot-512.png',
  '/icons/tarot-192-maskable.png',
  '/icons/tarot-512-maskable.png',
  '/icons/tarot-apple-touch.png',
  '/icons/tarot-favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        // Only clear stale Wetware Arcana caches — never a neighbour app's.
        keys.filter((k) => k.startsWith('tarot-') && k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // App shell: network-first so a redeployed deck reaches installed users,
  // falling back to the cached page when offline. ignoreSearch keeps ?seed=
  // and ?source=pwa variants resolving to the one cached document.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put('/tarot.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('/tarot.html', { ignoreSearch: true }))
    );
    return;
  }

  // Same-origin assets (icons, manifest): cache-first, then network.
  if (sameOrigin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Cross-origin (Google Fonts): cache-first, best-effort.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => cached))
  );
});
