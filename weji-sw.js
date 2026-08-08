/* Weji PWA service worker.
   Registered with scope "/weji.html" so it coexists with the site's
   other app service workers (e.g. dice-sw.js at scope "/"): the most
   specific scope controls the Weji page, and cache cleanup below only
   touches "weji-" caches so a neighbor's cache is never evicted.
   Bump CACHE_VERSION whenever the precached assets change. */
const CACHE_VERSION = 'weji-v1';
const PRECACHE = [
  '/weji.html',
  '/weji.webmanifest',
  '/photos/weji-1.jpg',
  '/photos/weji-2.jpg',
  '/photos/weji-3.jpg',
  '/photos/weji-4.jpg',
  '/photos/weji-5.jpg',
  '/photos/weji-6.jpg',
  '/icons/weji-192.png',
  '/icons/weji-512.png',
  '/icons/weji-192-maskable.png',
  '/icons/weji-512-maskable.png',
  '/icons/weji-apple-touch.png',
  '/icons/weji-favicon-32.png'
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
        // Only clear stale Weji caches — never a neighbor app's cache.
        keys.filter((k) => k.startsWith('weji-') && k !== CACHE_VERSION)
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

  // App shell: serve the cached board for navigations when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/weji.html', { ignoreSearch: true }))
    );
    return;
  }

  // Same-origin assets: cache-first, then network (and cache the result).
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

  // Cross-origin (e.g. Google Fonts): cache-first, best-effort.
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
