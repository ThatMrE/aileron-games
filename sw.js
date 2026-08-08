/* Pun Bearable service worker — offline app shell for the PWA / TWA.
   Scoped conservatively: it only handles the Pun Bearable page, its card art,
   icons, manifest and the Google Fonts it uses. All other site requests
   (the studio homepage, Weji, etc.) pass straight through to the network. */

const VERSION = 'pb-v1';
const SHELL_CACHE = 'pb-shell-' + VERSION;
const RUNTIME_CACHE = 'pb-runtime-' + VERSION;

const CARD_FILES = [
  'alcohol', 'animals', 'apparel', 'art', 'camping', 'cartoons', 'celebrities',
  'cities', 'color', 'comicbooks', 'cooking', 'countries', 'food', 'fruit',
  'furniture', 'games', 'genres', 'history', 'holidays', 'jobs', 'landmarks',
  'literature', 'love', 'math', 'memes-internet', 'meta', 'music', 'pets',
  'pick-the-theme', 'politics', 'science', 'sex', 'space', 'sports',
  'transportation', 'tv', 'vacation', 'vegetables', 'water', 'weather'
];

const SHELL_ASSETS = [
  '/punbearable.html',
  '/pun-bearable.webmanifest',
  '/assets/app-icons/icon-192.png',
  '/assets/app-icons/icon-512.png',
  '/assets/app-icons/icon-maskable-192.png',
  '/assets/app-icons/icon-maskable-512.png',
  '/assets/app-icons/apple-touch-icon-180.png'
].concat(CARD_FILES.map(function (f) { return '/assets/cards/' + f + '.png'; }));

// Only these requests are handled by the SW; everything else is left alone.
function isShellPath(url) {
  return url.pathname === '/punbearable.html' ||
         url.pathname === '/pun-bearable.webmanifest' ||
         url.pathname.indexOf('/assets/cards/') === 0 ||
         url.pathname.indexOf('/assets/app-icons/') === 0;
}
function isFontHost(url) {
  return url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      // Best-effort: don't let one missing asset abort the whole install.
      return Promise.allSettled(SHELL_ASSETS.map(function (a) {
        return cache.add(new Request(a, { cache: 'reload' }));
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL_CACHE && k !== RUNTIME_CACHE) { return caches.delete(k); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') { return; }

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;

  // App shell (same-origin): cache-first, fall back to network, then to the
  // cached page for navigations so the game opens offline.
  if (sameOrigin && (isShellPath(url) || req.mode === 'navigate')) {
    if (req.mode === 'navigate' && url.pathname !== '/punbearable.html') { return; }
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) { return cached; }
        return fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(SHELL_CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(function () {
          if (req.mode === 'navigate') { return caches.match('/punbearable.html'); }
        });
      })
    );
    return;
  }

  // Google Fonts: stale-while-revalidate into the runtime cache.
  if (isFontHost(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(function (cache) {
        return cache.match(req).then(function (cached) {
          var network = fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) { cache.put(req, res.clone()); }
            return res;
          }).catch(function () { return cached; });
          return cached || network;
        });
      })
    );
  }
});
