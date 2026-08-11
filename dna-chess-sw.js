/* DNA Chess PWA service worker.
   Registered with scope "/dna-chess.html" so it coexists with the site's
   other app service workers (weji-sw.js, punbearable-sw.js, dice-sw.js, …).
   The fetch handler only touches the DNA Chess app shell, and cache cleanup
   only evicts "dnachess-" caches, so a neighbouring app is never affected.
   Bump CACHE_VERSION whenever the precached assets change. */
const CACHE_VERSION = 'dnachess-v1';
const PRECACHE = [
  '/dna-chess.html',
  '/dna-chess.webmanifest',
  '/icons/dnachess-192.png',
  '/icons/dnachess-512.png',
  '/icons/dnachess-192-maskable.png',
  '/icons/dnachess-512-maskable.png',
  '/icons/dnachess-apple-touch.png',
  '/icons/dnachess-favicon-32.png'
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
        keys.filter((k) => k.startsWith('dnachess-') && k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  // Only serve the DNA Chess app shell offline; let the network handle the
  // rest of the site so neighbouring pages/apps are untouched.
  const p = url.pathname;
  const mine = p === '/dna-chess.html'
    || p === '/dna-chess.webmanifest'
    || p.startsWith('/icons/dnachess-');
  if (!mine) return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) =>
      cached || fetch(event.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match('/dna-chess.html'))
    )
  );
});
