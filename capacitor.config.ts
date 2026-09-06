import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.upios.myupihelp",
  appName: "MyUPI Help",
  // Static SPA bundle produced by `npm run build:apk`.
  webDir: "dist/client",
};

export default config;
