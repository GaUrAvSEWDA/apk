// Post-build step for the APK web bundle.
// TanStack Start SPA mode emits the app shell as `_shell.html`; Capacitor's
// WebView expects `index.html` as the entry point, so copy it into place.
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const shell = join(clientDir, "_shell.html");
const indexHtml = join(clientDir, "index.html");

if (!existsSync(shell)) {
  console.error(`[prepare-apk-web] Expected shell not found at ${shell}. Did the build run?`);
  process.exit(1);
}

copyFileSync(shell, indexHtml);
console.log(`[prepare-apk-web] Wrote ${indexHtml} from _shell.html`);
