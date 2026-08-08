# God Does Not Play Dice — Android App

The game ships as a **PWA** (Progressive Web App), which gives two Android delivery paths.

## Path 1 — Install directly from the site (works today, no store, no build)

On an Android phone, open **https://aileron.games/dice.html** in Chrome:

- Tap the **📱 Install app** link in the nav (appears when Chrome deems the app installable), or
- Chrome menu (⋮) → **Add to Home screen** → **Install**.

You get a home-screen icon, a fullscreen standalone window (no browser chrome), and
**offline play** — the service worker (`dice-sw.js`) precaches the game, the rulebook,
and the icons, and runtime-caches the fonts after first load. iPhones work too via
Safari → Share → Add to Home Screen.

## Path 2 — Play Store listing (Trusted Web Activity)

A TWA wraps the live PWA in a real Android app (this is Google's recommended way to
ship a PWA to the Play Store). Build it on a machine with Node 18+ and JDK 17+
(Bubblewrap downloads the Android SDK itself):

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://aileron.games/manifest.webmanifest
#   suggested applicationId: games.aileron.dice
#   let it generate a signing keystore — BACK IT UP; Play updates require it forever
bubblewrap build
#   outputs app-release-signed.apk (sideload) and app-release-bundle.aab (Play Console)
```

Then link the app to the site so it runs fullscreen without a URL bar:

1. Get the signing cert fingerprint Bubblewrap prints (or
   `keytool -list -v -keystore android.keystore` → SHA-256).
2. Put it in [`/.well-known/assetlinks.json`](../.well-known/assetlinks.json), replacing
   `REPLACE_WITH_YOUR_SIGNING_CERT_SHA256_FINGERPRINT`, and deploy the site.
3. If you upload to Play Console with **Play App Signing**, Google re-signs the app —
   add *Google's* SHA-256 (Play Console → Setup → App integrity) to `assetlinks.json`
   as a second entry.

Upload the `.aab` to the Play Console as usual. Until the fingerprint matches, the
TWA still runs — it just shows a browser address bar.

> Why this shape: the game is a single self-contained HTML file, so the web app *is*
> the app. A TWA reuses the live, always-up-to-date site rather than freezing a copy
> in an APK — ship a fix to aileron.games and every install has it instantly.
> (This repo's build environment has no Android SDK and no network route to
> Google's SDK servers, so the APK/AAB must be built locally with the steps above.)
