# Pun Bearable — Android app (Trusted Web Activity)

Pun Bearable ships as a **Trusted Web Activity (TWA)**: a thin Android wrapper
around the live web game at `https://aileron.games/punbearable.html`. It runs
full-screen with no browser UI, has its own icon and splash screen, works
offline (via the service worker), and is publishable to the Google Play Store.

The web game is already a proper installable PWA, so on any Android phone you
can also just open the page in Chrome and tap **⋮ → Install app / Add to Home
screen** — no build required. The steps below produce the real, Play-Store
package.

## What's already in this repo

| File | Purpose |
| --- | --- |
| `pun-bearable.webmanifest` | Web App Manifest (name, icons, colors, `start_url`) |
| `punbearable-sw.js` | Service worker — offline app shell (page + all 40 cards + icons) |
| `assets/app-icons/` | App icons: `icon-192/512`, `icon-maskable-192/512`, `apple-touch-icon-180`, `icon-1024` (store) |
| `.well-known/assetlinks.json` | Digital Asset Links — **fingerprint placeholder to fill in** |
| `android/punbearable/twa-manifest.json` | Bubblewrap config (package id, colors, URLs, icons) |
| `android/punbearable/.gitignore` | Keeps keys/build artifacts out of git |

> The Pun Bearable TWA lives in its own `android/punbearable/` folder so it
> stays separate from the native **God Does Not Play Dice** Android project,
> which lives directly in `android/`.

`punbearable.html` links the manifest, sets `theme-color`, and registers `punbearable-sw.js`.

## Prerequisites

- **Node.js 18+**
- **JDK 17** (for the Android build / `keytool`)
- **Bubblewrap CLI**: `npm i -g @bubblewrap/cli`
  (first run downloads a JDK + Android SDK into `~/.bubblewrap` if you don't
  point it at your own)
- Optional: **Android Studio** to open/inspect/run the generated project.

## 1. Deploy the website first

The TWA loads the live site, and asset-link verification reads a file over
HTTPS, so everything must be published at `https://aileron.games` before you
build:

- `https://aileron.games/punbearable.html`
- `https://aileron.games/pun-bearable.webmanifest`
- `https://aileron.games/assets/app-icons/icon-512.png` (and the others)
- `https://aileron.games/.well-known/assetlinks.json`

This repo deploys to Netlify from the root (`netlify.toml → publish = "."`), so
merging to `main` publishes them. Confirm each URL returns `200`.

## 2. Build the Android app with Bubblewrap

From the repo root:

```bash
cd android/punbearable
# Initialize the project from the web manifest (uses twa-manifest.json here).
bubblewrap init --manifest="https://aileron.games/pun-bearable.webmanifest"
# ...or, to reuse the committed config directly:
#   bubblewrap build   (run this once a twa-manifest.json + keystore exist)
```

- When prompted, accept the values from `android/punbearable/twa-manifest.json`
  (package id `games.aileron.punbearable`, colors, etc.).
- Bubblewrap will offer to **create a signing key** — say yes. It writes
  `android.keystore` (alias `android`). **Keep this file and its passwords
  safe and out of git** — losing it means you can't ship updates.

Then build:

```bash
bubblewrap build
```

Outputs:
- `app-release-signed.apk` — for sideloading / testing
- `app-release-bundle.aab` — for the Play Store

> `android.keystore`, `*.apk`, and `*.aab` are git-ignored (see
> `android/punbearable/.gitignore`) — never commit signing keys or build artifacts.

## 3. Wire up Digital Asset Links (removes the URL bar)

The app and the domain must vouch for each other, or the TWA shows a browser
address bar.

1. Print your signing key's SHA-256 fingerprint:

   ```bash
   keytool -list -v -keystore android.keystore -alias android | grep SHA256
   ```

   Or let Bubblewrap print it: `bubblewrap fingerprint list`.

2. Put that fingerprint into `.well-known/assetlinks.json`, in the
   `games.aileron.punbearable` entry, replacing
   `REPLACE_WITH_YOUR_APP_SIGNING_SHA256_FINGERPRINT`:

   ```json
   "sha256_cert_fingerprints": ["AA:BB:CC:…:99"]
   ```

   > This file is a shared array that also holds the entry for another Aileron
   > app (`games.aileron.dice`). Edit only the `punbearable` object — leave the
   > other entries intact.

3. Redeploy the site and verify:
   `https://aileron.games/.well-known/assetlinks.json` returns the JSON, and
   Google's tester passes:
   `https://developers.google.com/digital-asset-links/tools/generator`

> **Play App Signing (important):** if you enroll in Play App Signing (default
> for new apps), Google re-signs your app with *its* key. The fingerprint that
> must appear in `assetlinks.json` is then the **"App signing key certificate"
> SHA-256** shown in **Play Console → your app → Test and release → App
> integrity**. Add that one (you can list several fingerprints in the array —
> keep your upload/local fingerprint too so sideloaded builds verify). Update
> the file and redeploy after your first Play upload.

## 4. Test on a device

```bash
adb install app-release-signed.apk
```

Launch it. With `assetlinks.json` live and matching, the app opens full-screen
with **no address bar**. If you see a URL bar, the fingerprint/host in
`assetlinks.json` doesn't match the installed build.

## 5. Publish to Google Play

1. In the [Play Console](https://play.google.com/console) create an app,
   package name `games.aileron.punbearable`.
2. Upload `app-release-bundle.aab` to a testing track.
3. Fill in the store listing (use `assets/app-icons/icon-1024.png` for the
   512×512 store icon — resize as needed — plus feature graphic and
   screenshots).
4. Complete the content rating, data-safety, and privacy-policy forms.
5. After the first upload, copy the **App signing key** SHA-256 from App
   integrity into `assetlinks.json` (step 3 note), redeploy, then roll out.

## Updating the app

- **Web/game changes:** just deploy the site — the TWA loads the live page, so
  users get updates instantly (the service worker refreshes its cache on the
  next visit; bump `VERSION` in `punbearable-sw.js` to force a refresh).
- **Native shell changes** (icon, name, colors, new Android features): edit
  `android/punbearable/twa-manifest.json`, bump `appVersionCode` (and `appVersionName`),
  run `bubblewrap update && bubblewrap build`, and upload the new `.aab`.
