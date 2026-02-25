# Common Errors and How to Fix Them

## 1. CORS errors when Shell loads MFE scripts

**Symptom:** Console errors like `Access to script at 'http://localhost:4200/...' from origin 'http://localhost:5173' has been blocked by CORS policy`.

**Fix:**
- Ensure each MFE dev server has CORS enabled. For Vite (React, Vue, Shell) this is usually default.
- For Angular: `ng serve` typically allows same-origin; when the Shell is on 5173 and Angular on 4200, you need the Angular dev server to send `Access-Control-Allow-Origin`. You can use a proxy in the Shell’s Vite config to avoid cross-origin requests, or run Angular’s dev server with a CORS flag if available. **Practical workaround:** Use the **built** Angular WC and serve it with `npx serve dist/wc -p 4200`; `serve` can be configured to add CORS headers, or use a small Express server that sets `Access-Control-Allow-Origin: *` for development.
- For Next.js: ensure `next dev` is running and that the WC script is under `public/` (e.g. `public/wc/nextjs-body.js`) so it’s served with correct headers.

**Alternative:** Configure the Shell’s Vite dev server to proxy each MFE origin so the browser only talks to 5173 (see [Vite proxy](https://vitejs.dev/config/server-options.html#server-proxy)).

---

## 2. Angular: “main.js” or “browser/main.js” 404

**Symptom:** Shell loads Angular MFE but the script returns 404.

**Fix:**
- Angular 18’s application builder may output to `dist/<outputPath>/browser/`. If you used `--output-path dist/wc`, check whether files are in `dist/wc/` or `dist/wc/browser/`.
- If they are in `dist/wc/browser/`, run:
  ```bash
  npx serve dist/wc -p 4200
  ```
  Then the script URL is `http://localhost:4200/browser/main.js`. Update `shell/src/mfe-config.ts`: use `scriptUrl: `${baseUrls.angular}/browser/main.js`` and `styleUrl: `${baseUrls.angular}/browser/styles.css``.
- If they are in `dist/wc/` (no `browser/`), serve `dist/wc` and use `scriptUrl: `${baseUrls.angular}/main.js``.

---

## 3. Next.js: “nextjs-body.js” not found or custom element not defined

**Symptom:** 404 for `/wc/nextjs-body.js` or `<nextjs-body>` not defined.

**Fix:**
- Run the WC build: `cd nextjs-body && npm run build:wc`. This writes `public/wc/nextjs-body.js`.
- Start Next.js: `npm run dev`. The file is then at `http://localhost:3000/wc/nextjs-body.js`.
- If the custom element still doesn’t register, open `http://localhost:3000/wc/nextjs-body.js` in the browser and check the console for runtime errors (e.g. missing React or Rollup build errors).

---

## 4. React/Vue: Script loads but custom element doesn’t appear

**Symptom:** No errors in console but `<react-middle>` or `<vue-footer>` is empty or not upgraded.

**Fix:**
- Ensure the custom element is defined before the Shell renders it. The Shell injects the script and then the elements already exist in the DOM; when the script runs, it should call `customElements.define(...)`. If the script is loaded as a **module**, it runs asynchronously — the elements should still upgrade once the script runs.
- Check that the tag names in the Shell’s `index.html` match the names used in `customElements.define` (e.g. `react-middle`, `vue-footer`).
- For Vue: `defineCustomElement` requires the component to be defined in a way compatible with custom elements (no router/store unless you provide them). Keep the footer component simple.

---

## 5. “Failed to load script” or “Failed to load style”

**Symptom:** `load-mfe.ts` rejects with “Failed to load script/style”.

**Fix:**
- Confirm the MFE dev server (or static server) for that URL is running.
- Open the script/style URL in the browser (e.g. `http://localhost:5174/src/wc-entry.tsx`). You should see the script or a transformed version, not 404.
- For production, ensure the base URLs in `mfe-config.ts` point to the deployed MFE origins and that the server sends correct CORS headers if the Shell is on a different origin.

---

## 6. Angular: Zone.js or “InjectionToken” errors

**Symptom:** Errors about Zone.js or dependency injection after the Angular WC loads.

**Fix:**
- Angular Elements depends on Zone.js and the Angular runtime. The single script built by `ng build` should include them. If you see “Zone is not defined”, the build may have split polyfills; in that case add a second script in `mfe-config.ts` that loads the polyfills chunk before `main.js` (or the script that contains the custom element).
- Use a single build configuration that produces one bundle (or a known set of chunks) and load them in order in the Shell.

---

## 7. Vue: “defineCustomElement” or style not applied

**Symptom:** Vue footer renders without styles or throws about `defineCustomElement`.

**Fix:**
- Vue 3’s `defineCustomElement` works with SFCs. Ensure you’re importing the component that uses `<style scoped>`; the styles are inlined when the custom element is defined.
- If styles are in a separate CSS file, the Shell must load that CSS (e.g. set `styleUrl` in `mfe-config.ts` for the built `vue-footer.css`).

---

## 8. Port already in use

**Symptom:** `Error: listen EADDRINUSE: :::4200` (or 3000, 5173, etc.).

**Fix:**
- Stop the process using that port, or use a different port:
  - Angular: `npx serve dist/wc -p 4201` and set `baseUrls.angular` to `http://localhost:4201` in the Shell config.
  - Next: `next dev -p 3001`
  - React: `vite --port 5176`
  - Vue: `vite --port 5177`
  - Shell: change `server.port` in `shell/vite.config.ts`.

---

## 9. Next.js WC: "process is not defined"

**Symptom:** `Uncaught ReferenceError: process is not defined` when loading `nextjs-body.js` in the browser.

**Fix:** The WC Rollup build must define `process` for the browser. In `nextjs-body/rollup.wc.config.mjs`, the config already adds `output.intro: 'var process = { env: { NODE_ENV: "production" } };'` and replaces `process.env.NODE_ENV`. Re-run `npm run build:wc` in nextjs-body after any config change.

---

## 10. TypeScript or build errors in Next.js WC build

**Symptom:** `rollup.wc.config.mjs` or `tsconfig.wc.json` fails (e.g. “Cannot find module” or JSX errors).

**Fix:**
- Install Rollup and plugins: `cd nextjs-body && npm install`.
- Ensure `tsconfig.wc.json` includes `wc/**/*` and `components/**/*` and that `jsx` is set (e.g. `"jsx": "react-jsx"`).
- If Rollup can’t resolve React, add `@rollup/plugin-node-resolve` and `@rollup/plugin-commonjs` and resolve `browser: true`.

---

## 11. Shell shows blank page or only some sections

**Fix:**
- Open DevTools → Network and check which script/style requests fail (404, CORS, or non-200).
- Open DevTools → Console for JavaScript errors in the Shell or in the MFE scripts.
- Verify each MFE’s custom element is defined: in the console run `customElements.get('angular-header')`, etc. If one returns `undefined`, that MFE’s script didn’t run or didn’t call `customElements.define`.
