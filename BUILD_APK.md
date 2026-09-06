# Building the "MyUPI Help" Android APK

This project is a client-side React SPA (a UPI help-flow prototype). It is
packaged into a native Android app with [Capacitor](https://capacitorjs.com):
the web app is built as a static bundle and loaded inside an Android WebView, so
the APK runs fully offline with no backend.

## What was added for packaging

- `vite.config.apk.ts` — a build config that emits a static SPA (SPA mode on,
  server/Nitro off). Kept separate from `vite.config.ts` so the normal Lovable
  dev/build flow is untouched.
- `scripts/prepare-apk-web.mjs` — copies the SPA shell (`_shell.html`) to
  `index.html`, which Capacitor's WebView uses as its entry point.
- `capacitor.config.ts` — app id `com.upios.myupihelp`, app name `MyUPI Help`,
  web dir `dist/client`.
- `android/` — the generated native Android project.
- npm scripts: `build:apk` and `apk:debug` / `apk:release` (see below).

## Prerequisites (already present on the original build machine)

- Node.js 18+ and npm
- A JDK 21 (Android Studio bundles one at
  `C:\Program Files\Android\Android Studio\jbr`)
- Android SDK with `build-tools`, a platform (compileSdk 36), and platform-tools

## Rebuild the APK

```sh
# 1. Build the static web bundle
npm run build:apk

# 2. Copy the web bundle into the native project
npx cap sync android

# 3. Build the APK (from the android/ folder). On Windows PowerShell:
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android
.\gradlew.bat assembleDebug        # debug APK (installable, unsigned-debug)
# or
.\gradlew.bat assembleRelease      # release APK (needs signing config)
```

The debug APK is written to:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Install on a phone

1. Copy `app-debug.apk` to the Android device (USB, Drive, email, etc.).
2. On the device, tap the file and allow "Install from unknown sources" when
   prompted.
3. Open **MyUPI Help**.

Or, with the phone connected via USB and USB debugging enabled:

```sh
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

## Notes

- This is a UI prototype: screens navigate and animate, but there are no real
  payments or backend calls.
- To change the app icon later, replace the PNGs in
  `android/app/src/main/res/mipmap-*/` (or use `@capacitor/assets`).
- A debug APK is fine for sharing/sideloading. For the Play Store you need a
  signed release build (a keystore + signing config in `android/app/build.gradle`).
