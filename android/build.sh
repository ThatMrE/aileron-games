#!/usr/bin/env bash
# Build a signed, sideloadable APK using only Ubuntu-packaged Android tools:
#   apt-get install aapt apksigner zipalign dalvik-exchange android-sdk-platform-23
# Compiled against API 23 (only ancient WebView APIs are used) but declares
# targetSdk 34 so it installs on current Android. Requires: KEYSTORE and
# KS_PASS env vars pointing at your signing keystore (NEVER commit it).
set -euo pipefail
SDK=/usr/lib/android-sdk/platforms/android-23/android.jar
cd "$(dirname "$0")"
rm -rf build && mkdir -p build/obj
javac --release 8 -cp "$SDK" -d build/obj src/games/aileron/dice/MainActivity.java
dalvik-exchange --dex --output=build/classes.dex build/obj
aapt package -f -M AndroidManifest.xml -S res -I "$SDK" \
  --min-sdk-version 23 --target-sdk-version 34 -F build/app.unaligned.apk
(cd build && aapt add app.unaligned.apk classes.dex)
zipalign -f 4 build/app.unaligned.apk build/app.aligned.apk
apksigner sign --ks "$KEYSTORE" --ks-pass pass:"$KS_PASS" --out build/GodDoesNotPlayDice.apk build/app.aligned.apk
apksigner verify --print-certs build/GodDoesNotPlayDice.apk
echo "Built: android/build/GodDoesNotPlayDice.apk"
