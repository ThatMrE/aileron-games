/* FDA: Forever Doesn't Allow — service worker.

   Precaches the game so an installed copy runs with no network at all. That
   matters more here than it does for most of these games: the whole look
   depends on Press Start 2P and VT323, and when a webfont fails to load the
   browser does not report an error — it silently substitutes a system font
   and the 8-bit design just evaporates. So fonts are cached on first visit
   and served cache-first forever after.

   The game itself keeps its state in localStorage (the gravesite and the run
   ledger), which the service worker does not touch and does not need to. */
const VERSION = "fda-v1";
const PRECACHE = [
  "/fda.html",
  "/fda.webmanifest",
  "/icons/fda-192.png",
  "/icons/fda-512.png",
  "/icons/fda-192-maskable.png",
  "/icons/fda-512-maskable.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      // addAll is all-or-nothing; one 404 would leave the app uninstallable,
      // so each entry is added on its own and a miss is survivable.
      .then((c) => Promise.all(PRECACHE.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Fonts: cache-first with a background refresh, so the pixel type survives
  // going offline. Opaque responses are cached deliberately — a cross-origin
  // font is opaque and still renders.
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(VERSION).then(async (c) => {
        const hit = await c.match(req);
        const refresh = fetch(req)
          .then((res) => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; })
          .catch(() => hit);
        return hit || refresh;
      })
    );
    return;
  }

  // Anything else off-origin is none of our business.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first so a deployed update is picked up promptly,
  // falling back to the cached game when there is no network.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/fda.html")))
    );
    return;
  }

  // Same-origin assets: cache-first.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }))
  );
});
