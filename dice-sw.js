/* God Does Not Play Dice — service worker.
   Precaches the game so it runs offline as an installed app;
   fonts are runtime-cached; everything else passes through. */
const VERSION = "gdnpd-v1";
const PRECACHE = [
  "/dice.html",
  "/dice-rules.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
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

  // Fonts: cache-first with background refresh (works offline after first visit)
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(VERSION).then(async (c) => {
        const hit = await c.match(req);
        const refresh = fetch(req).then((res) => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || refresh;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Same-origin: network-first, cache fallback, so updates flow when online
  // and the installed app still boots offline.
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && (PRECACHE.includes(url.pathname) || req.mode === "navigate")) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(req, { ignoreSearch: true });
        if (hit) return hit;
        if (req.mode === "navigate") {
          const home = await caches.match("/dice.html");
          if (home) return home;
        }
        return Response.error();
      })
  );
});
