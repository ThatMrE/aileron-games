# Native APK build (no Google SDK required)

A minimal single-Activity WebView shell around the same bundled game.

This exists because **the Capacitor build needs Android Gradle Plugin 8.x, which
reaches only Google's Maven repository**. The newest AGP on Maven Central is
2.3.0 from 2017. If you are on a machine or CI runner that cannot reach
`dl.google.com`, the Capacitor path is impossible and this one still works —
it needs nothing but Debian/Ubuntu packages.

## Build

```bash
sudo apt-get install -y aapt android-sdk-build-tools android-sdk-platform-23 \
                        apksigner zipalign dalvik-exchange default-jdk
./build.sh
```

Output: `build/fda-debug.apk`, signed with a debug keystore generated on first
run. Install with `adb install -r build/fda-debug.apk`.

## The toolchain, and why each piece

| Step | Tool | Debian package |
|---|---|---|
| Compile resources | `aapt2` | `android-sdk-build-tools` |
| Link manifest + resources + assets | `aapt2 link` | `android-sdk-build-tools` |
| Compile Java (`--release 8`) | `javac` | `default-jdk` |
| Java bytecode to dex | `dx` (as `dalvik-exchange`) | `dalvik-exchange` |
| Insert `classes.dex` | `aapt add` | `aapt` |
| Align | `zipalign` | `zipalign` |
| Sign v1+v2+v3 | `apksigner` | `apksigner` |

## Two deliberate choices

**Compiled against API 23, targets API 34.** Debian only packages
`android-sdk-platform-23`, so `android.jar` is API 23 — which is ample, since
this shell touches nothing but `Activity`, `WebView` and `AlertDialog`. But the
manifest *declares* `targetSdkVersion 34`, because modern Android refuses to
install apps that target too low an API. `targetSdkVersion` is a promise about
runtime behaviour, not a compile-time dependency, so the combination is
legitimate. One consequence: nothing can reference `android:roundIcon` (API 25),
so the APK ships the round icon without declaring it.

**A `WebChromeClient` is mandatory, not decoration.** A bare `WebView` silently
swallows `window.confirm()` and returns false. The game uses `confirm()` for
"Restart the trail?", so without this the Restart button would quietly do
nothing. That is the kind of bug that only shows up on a device.

## Back button

The page owns the decision. `window.__androidBack()` — defined in the shared
shim in `../tools/build-www.mjs`, so the Capacitor build uses the identical
logic — closes an open Sources/Reskins sheet and returns `"closed"`, or returns
`"exit"`. `MainActivity.onBackPressed()` evaluates it and confirms before
discarding the playthrough. One contract, two shells, no drift.

## No permissions

There is no `<uses-permission>` element in the manifest at all. The game is
entirely bundled, and an existing browser opens the citation links through an
`ACTION_VIEW` intent, so the app requests nothing.

## Verified

We built and inspected the APK here:

- `apksigner verify`: passes v1, v2 and v3 signature schemes.
- `classes.dex`: valid magic, verified Adler-32 checksum, 15 class definitions
  including `MainActivity` and its inner classes.
- Contents: `assets/index.html` (96 KB), `assets/fonts/fonts.css` (476 KB of
  base64 woff2), icons at all five densities, `resources.arsc`.
- **We extracted the payload back out of the built APK and played it through** at
  412x915 with touch emulation and every non-`file://` request aborted: full run
  to the end card, pixel fonts loaded from base64, `__androidBack()` returning
  `closed` then `exit` as `MainActivity` expects, **0 network requests, 0 JS
  errors**, no horizontal overflow.

Not verified: it has not been installed on a physical device. Everything above
is static analysis of the artifact plus a browser-level run of its payload.
