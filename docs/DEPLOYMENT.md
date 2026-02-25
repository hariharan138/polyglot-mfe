# Deployment Strategy for All Micro Frontends

## Overview

Each app (Shell + four MFEs) can be built and deployed **independently**. The Shell only needs the **URLs** of each MFE’s script (and optional style). No iframes; the Shell loads scripts and renders custom elements.

---

## 1. Build outputs

| App              | Build command(s)      | Output / artifact to deploy |
|------------------|------------------------|-----------------------------|
| **Shell**        | `cd shell && npm run build` | `shell/dist/` (static HTML + JS + CSS) |
| **Angular**      | `cd angular-header && npm run build:wc` | `angular-header/dist/wc/` (or `dist/wc/browser/`) — static JS + CSS |
| **Next.js**      | `next build` + `npm run build:wc` | Next.js app (e.g. Vercel) + `public/wc/nextjs-body.js` served as static asset |
| **React**        | `cd react-middle && npm run build` | `react-middle/dist/` — `react-middle.js` + optional `react-middle.css` |
| **Vue**          | `cd vue-footer && npm run build` | `vue-footer/dist/` — `vue-footer.js` + optional `vue-footer.css` |

---

## 2. Where to host

- **Static hosting (Shell, Angular, React, Vue WC bundles):**  
  Any static host: **Vercel**, **Netlify**, **Cloudflare Pages**, **AWS S3 + CloudFront**, **Azure Static Web Apps**, **Firebase Hosting**, etc.
- **Next.js:**  
  Deploy the full Next.js app (e.g. Vercel, or Node server for `next start`). The WC script lives in `public/wc/nextjs-body.js`, so it’s served as a static file from the same origin.

---

## 3. Configuring the Shell for production

The Shell must know the **production URLs** of each MFE script (and style if applicable).

**Option A – Environment at build time (recommended)**

- Define env vars (e.g. `VITE_ANGULAR_MFE_URL`, `VITE_NEXTJS_MFE_URL`, …) and use them in `shell/src/mfe-config.ts`:

```ts
const baseUrls = {
  angular: import.meta.env.VITE_ANGULAR_MFE_URL ?? 'http://localhost:4200',
  nextjs: import.meta.env.VITE_NEXTJS_MFE_URL ?? 'http://localhost:3000',
  react: import.meta.env.VITE_REACT_MFE_URL ?? 'http://localhost:5174',
  vue: import.meta.env.VITE_VUE_MFE_URL ?? 'http://localhost:5175',
};
```

- In CI/CD, set these to your deployed MFE origins (e.g. `https://mfe-angular.myapp.com`, `https://mfe-next.myapp.com`, …) and build the Shell with `vite build`.

**Option B – Config file**

- Ship a `config.json` or `config.js` from the same origin as the Shell (or a known URL), and have the Shell fetch it at runtime before loading MFEs. The config contains the same script/style URLs you use in `mfe-config.ts`.

**Option C – Same origin (simplest for demos)**

- Deploy the Shell and all MFE bundles behind one domain/path, e.g.:
  - `https://app.example.com/` → Shell
  - `https://app.example.com/mfe/angular/` → Angular WC assets
  - `https://app.example.com/mfe/nextjs/wc/nextjs-body.js` → Next.js WC
  - etc.
- Then in `mfe-config.ts` use relative URLs (e.g. `/mfe/angular/browser/main.js`). No CORS and no env vars needed.

---

## 4. Deployment order and independence

- **Order:** Deploy MFE assets first, then deploy the Shell (so the Shell’s config points to live MFE URLs). For same-origin setup, deploy in any order.
- **Independence:** You can redeploy only the React MFE; the Shell and other MFEs don’t need to be rebuilt. Only the Shell needs a new build when **MFE URLs** change (e.g. new domains or paths).

---

## 5. Versioning and cache busting

- **Hashed filenames:** Use build output with hashes (e.g. `main.abc123.js`) and reference that exact filename in the Shell’s config (or in a config file). This gives cache busting when you deploy a new version.
- **Query params:** Alternatively, keep filenames stable and append a version query (e.g. `nextjs-body.js?v=2`). Less ideal for long-term caching but simple.

---

## 6. CORS

If the Shell and MFEs are on **different origins** (e.g. Shell at `https://shell.myapp.com`, Angular at `https://mfe-angular.myapp.com`):

- Each MFE’s host must send:
  - `Access-Control-Allow-Origin: https://shell.myapp.com` (or `*` for public demos), and
  - Appropriate headers for script/style requests.
- Static hosts (Vercel, Netlify, etc.) usually allow cross-origin by default or via headers config. Configure CORS on the host that serves the MFE scripts.

---

## 7. Example: Vercel for Shell + static MFEs

- **Shell:** Create a Vercel project from `shell/`, build command `npm run build`, output directory `dist`. Set env vars for MFE URLs and rebuild when they change.
- **Angular/React/Vue (WC only):** Create a Vercel (or Netlify) project from each app’s directory, build command e.g. `npm run build` or `npm run build:wc`, output directory the one that contains the WC JS/CSS (e.g. `dist` or `dist/wc`). Root of the project = base URL for that MFE (e.g. `https://mfe-angular.vercel.app/main.js` or `.../browser/main.js`).
- **Next.js:** Deploy the full Next app to Vercel; `public/wc/nextjs-body.js` is served automatically. Use that URL in the Shell config.

---

## 8. Summary

- Build each MFE and the Shell as described above.
- Point the Shell at production script (and style) URLs via env vars or a config file.
- Host static assets on any CDN/static host; host Next.js as a full app.
- Use CORS when Shell and MFEs are on different origins; use same-origin or relative URLs to avoid CORS.
- Use hashed filenames or versioned URLs for cache-safe updates.
