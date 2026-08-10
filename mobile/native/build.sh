#!/usr/bin/env bash
# Builds a real, installable APK using only the Debian/Ubuntu Android packages —
# no Android Studio, no `sdkmanager`, nothing fetched from dl.google.com.
#
#   apt-get install aapt android-sdk-build-tools android-sdk-platform-23 \
#                   apksigner zipalign dalvik-exchange default-jdk
#
# Produces build/fda-debug.apk, signed with a local debug keystore.
set -euo pipefail

cd "$(dirname "$0")"
HERE="$PWD"
OUT="$HERE/build"
WWW="$HERE/../www"
ANDROID_JAR="${ANDROID_JAR:-/usr/lib/android-sdk/platforms/android-23/android.jar}"

# dx is packaged under its Debian name
DX="${DX:-dalvik-exchange}"
command -v "$DX" >/dev/null || DX="java -cp /usr/share/java/com.android.dx.jar com.android.dx.command.Main"

MIN_SDK=23
# Compiled against android.jar 23 (all this shell touches is WebView + Activity),
# but we *declare* a modern target so Android 14/15 will install it: the platform
# blocks apps that target too low an API. targetSdk is a promise about behaviour,
# not a compile-time dependency, so this combination is legitimate.
TARGET_SDK=34
VERSION_CODE=1
VERSION_NAME=1.0

echo "==> regenerating web payload from ../../fda.html"
( cd "$HERE/.." && node tools/build-www.mjs )

[ -f "$WWW/index.html" ] || { echo "missing $WWW/index.html"; exit 1; }

rm -rf "$OUT"; mkdir -p "$OUT/gen" "$OUT/classes" "$OUT/apk"

echo "==> aapt2 compile resources"
aapt2 compile --dir res -o "$OUT/res.zip"

echo "==> aapt2 link (manifest + resources + assets)"
aapt2 link \
  -I "$ANDROID_JAR" \
  --manifest AndroidManifest.xml \
  -A "$WWW" \
  --java "$OUT/gen" \
  --min-sdk-version "$MIN_SDK" \
  --target-sdk-version "$TARGET_SDK" \
  --version-code "$VERSION_CODE" \
  --version-name "$VERSION_NAME" \
  -o "$OUT/apk/base.apk" \
  "$OUT/res.zip"

echo "==> javac"
# --release 8 keeps the bytecode at a level dx understands
find src "$OUT/gen" -name '*.java' > "$OUT/sources.txt"
javac --release 8 -nowarn -classpath "$ANDROID_JAR" -d "$OUT/classes" @"$OUT/sources.txt"

echo "==> dex"
$DX --dex --output="$OUT/apk/classes.dex" "$OUT/classes"

echo "==> add classes.dex to the archive"
( cd "$OUT/apk" && aapt add base.apk classes.dex >/dev/null )

echo "==> zipalign"
zipalign -f -p 4 "$OUT/apk/base.apk" "$OUT/apk/aligned.apk"

echo "==> sign"
KS="$OUT/debug.keystore"
if [ ! -f "$KS" ]; then
  keytool -genkeypair -v -keystore "$KS" -storepass android -keypass android \
    -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10950 \
    -dname "CN=Android Debug,O=Android,C=US" >/dev/null 2>&1
fi
apksigner sign --ks "$KS" --ks-pass pass:android --key-pass pass:android \
  --out "$OUT/fda-debug.apk" "$OUT/apk/aligned.apk"

echo "==> verify"
apksigner verify --print-certs "$OUT/fda-debug.apk" | head -3
aapt dump badging "$OUT/fda-debug.apk" | head -4

echo
echo "APK: $OUT/fda-debug.apk  ($(du -h "$OUT/fda-debug.apk" | cut -f1))"
echo "install with:  adb install -r $OUT/fda-debug.apk"
