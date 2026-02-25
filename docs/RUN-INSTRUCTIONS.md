# Final Run Instructions

## Local development (all apps on different ports)

| App              | Port | Command (from app dir) |
|------------------|------|-------------------------|
| Angular Header   | 4200 | `npm run build:wc` then `npx serve dist/wc -p 4200` (or `dist/wc/browser` if applicable) |
| Next.js Body     | 3000 | `npm run build:wc` then `npm run dev` |
| React Middle     | 5174 | `npm run dev` |
| Vue Footer       | 5175 | `npm run dev` |
| **Shell**        | 5173 | `npm run dev` |

1. **Install once** (from repo root):
   ```bash
   npm run install:all
   ```

2. **Build MFEs that expose a separate WC bundle**:
   ```bash
   cd angular-header && npm run build:wc && cd ..
   cd nextjs-body && npm run build:wc && cd ..
   ```

3. **Start each app** in its own terminal (or use a tool like `concurrently`):
   - Angular: `cd angular-header && npx serve dist/wc -p 4200`
   - Next.js: `cd nextjs-body && npm run dev`
   - React: `cd react-middle && npm run dev`
   - Vue: `cd vue-footer && npm run dev`
   - Shell: `cd shell && npm run dev`

4. **Open the Shell**: **http://localhost:5173**

The Shell will load each micro frontend from the URLs in `shell/src/mfe-config.ts`. Ensure those base URLs match the ports above (4200, 3000, 5174, 5175).

---

## Running with one command (optional)

From repo root you can use:

```bash
npm run dev:angular   # Angular (after build:wc, run serve:wc)
npm run dev:nextjs    # Next.js
npm run dev:react     # React
npm run dev:vue       # Vue
npm run dev:shell     # Shell
```

Run each in a separate terminal, or add a script that uses `concurrently` to start all five.

---

## Production-like run (built assets only)

1. Build everything:
   ```bash
   npm run build:all
   ```

2. Serve each MFE’s build output on its port (e.g. with `serve` or any static server):
   - Angular: `npx serve angular-header/dist/wc -p 4200`
   - Next.js: run `next start -p 3000` and ensure `public/wc/nextjs-body.js` is present (from `build:wc`)
   - React: `npx serve react-middle/dist -p 5174`
   - Vue: `npx serve vue-footer/dist -p 5175`

3. Build and serve the Shell (e.g. `vite build` then `vite preview` or host `shell/dist` on 5173).

4. Ensure `shell/src/mfe-config.ts` (or the built config) points to these base URLs. For production you would typically use environment variables or a config file instead of hardcoded `localhost` URLs.
