// Dedicated build config for packaging the app into a native APK (Capacitor).
// Produces a fully static, client-rendered SPA bundle — no server required —
// so it can run inside an Android WebView offline.
//
// This file is intentionally separate from vite.config.ts so the normal
// Lovable dev/build flow is untouched. Build with: npm run build:apk
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // SPA mode: emit a single prerendered index.html shell; the client router
    // handles every route at runtime (perfect for a WebView with no server).
    spa: { enabled: true },
  },
  // No server deployment target — we only want the static client assets.
  nitro: false,
});
