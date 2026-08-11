# DNA Chess — Android app (Play Store wrapper)

A thin native Android wrapper around the live DNA Chess PWA. `MainActivity` is a
full-screen `WebView` that loads **https://aileron.games/dna-chess.html?source=apk**,
so the app is always in sync with the site — every fix you deploy to
`dna-chess.html` reaches installed apps instantly, and the board's offline
support (its service worker) keeps working inside the app.

This is the same approach as the sibling `android-weji/` project, packaged as a
**Gradle** project because the Google Play Store requires an **Android App
Bundle (`.aab`)** for new apps, which Gradle produces directly.

- **Package / applicationId:** `games.aileron.dnachess`
- **Launches:** `https://aileron.games/dna-chess.html?source=apk`
- **minSdk 21, targetSdk 34**, portrait, no third-party dependencies.

## Prerequisites

- **JDK 17** (`java -version` → 17).
- **Android SDK** with an Android 34 platform + build-tools. Easiest via
  **Android Studio** (it also installs the right SDK bits automatically).
- First build downloads Gradle 8.7 (via the committed wrapper) and the Android
  Gradle Plugin from Google's Maven — needs network access.

> Heads-up: this repo's CI sandbox has no Android SDK and blocks Google's
> Maven/SDK hosts, so the app is **built on your machine**, not in CI.

## Quick start (Android Studio — recommended)

1. **Open** the `android-dna-chess/` folder in Android Studio (*File → Open*).
2. Let it sync, accept any SDK/build-tools install prompts.
3. **Run** on a device/emulator (▶), or build an artifact:
   - *Build → Build Bundle(s) / APK(s) → Build APK(s)* for a test APK.
   - *Build → Generate Signed Bundle / APK → Android App Bundle* for the Play
     Store `.aab` (walks you through creating/using a keystore).

## Command line

From `android-dna-chess/`:

```bash
# Debug APK (auto-signed with the debug key) — good for sideloading/testing:
./gradlew assembleDebug
# → app/build/outputs/apk/debug/app-debug.apk

# Release App Bundle for the Play Store (see signing below):
./gradlew bundleRelease
# → app/build/outputs/bundle/release/app-release.aab
```

### Signing a release

Create an **upload keystore once** (keep it safe and secret — losing it means
you can't update the app):

```bash
keytool -genkeypair -v -keystore dnachess-upload.jks \
  -alias dnachess -keyalg RSA -keysize 2048 -validity 10000
```

Then pass the credentials at build time (never commit the keystore). Add to
`~/.gradle/gradle.properties` (outside the repo):

```properties
DNACHESS_STORE_FILE=/absolute/path/to/dnachess-upload.jks
DNACHESS_STORE_PASSWORD=••••••
DNACHESS_KEY_ALIAS=dnachess
DNACHESS_KEY_PASSWORD=••••••
```

`app/build.gradle` picks these up automatically for the `release` build type.
With **Play App Signing** (recommended), you upload this bundle and Google
manages the final release signing key.

## Publishing to Google Play

1. Create the app in the [Play Console](https://play.google.com/console)
   (name **DNA Chess**, category Games).
2. Upload `app-release.aab` to a testing track first (Internal testing).
3. Fill the store listing. Assets in `store-assets/`:
   - `play-store-icon-512.png` — 512×512 app icon.
   - You'll also need a feature graphic (1024×500) and a few phone
     screenshots — grab those from the running app / the site.
4. Complete the Data safety form (the app collects nothing itself; it loads a
   website), content rating, and target audience, then roll out.

## Bumping the version

Edit `app/build.gradle`: increment `versionCode` (integer, every upload) and
`versionName` (display string). The web content updates on its own — you only
need a new build when the native shell or version metadata changes.

## Notes

- No `assetlinks.json` / Digital Asset Links needed: this is a `WebView` shell,
  not a Trusted Web Activity. (If you later prefer a TWA — which uses Chrome
  and removes the WebView entirely — that path needs a
  `/.well-known/assetlinks.json` on aileron.games with your signing SHA-256,
  plus the `androidx.browser` TWA `LauncherActivity` instead of the WebView.)
- The wrapper only allows `*.aileron.games` inside the WebView; external links
  open in the user's real browser.
- Launched from the app, the site loads with `?source=apk`, which shows the
  focused board view (the marketing sections are hidden) while keeping the
  how-to and full gameplay.
