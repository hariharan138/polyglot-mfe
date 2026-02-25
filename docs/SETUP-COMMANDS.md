# Step-by-Step Setup Commands

Run these from the repo root (`polyglot-mfe/`) or from each app directory as indicated.

## Prerequisites

- **Node.js** 18+ and **npm**
- (Optional) **pnpm** or **yarn** — replace `npm` in commands if you use them

---

## 1. Create the workspace (already done)

The repo already contains the full structure. If you were creating from scratch:

```bash
mkdir polyglot-mfe && cd polyglot-mfe
# Then create shell/, angular-header/, nextjs-body/, react-middle/, vue-footer/
```

---

## 2. Install dependencies

From **polyglot-mfe/** (root):

```bash
npm install
cd shell && npm install && cd ..
cd angular-header && npm install && cd ..
cd nextjs-body && npm install && cd ..
cd react-middle && npm install && cd ..
cd vue-footer && npm install && cd ..
```

Or use the root script (if you added it):

```bash
npm run install:all
```

---

## 3. Build each Micro Frontend (for Shell to load them)

Build in this order. Each MFE must be built so the Shell can load its script (and optional style) from the dev server or from built assets.

### Angular Header

```bash
cd angular-header
npm run build:wc
cd ..
```

Then serve the built WC (so the Shell can load it at port 4200):

```bash
cd angular-header
npx serve dist/wc -p 4200
# Leave this running; in another terminal continue below.
```

Angular 18 may output to `dist/wc/browser/`. If so, serve that folder instead:

```bash
npx serve dist/wc/browser -p 4200
```

If you use `dist/wc/browser`, the Shell’s config should use `http://localhost:4200/main.js` (no `browser/` in path). Update `shell/src/mfe-config.ts` accordingly.

### Next.js Body

```bash
cd nextjs-body
npm run build:wc
npm run dev
# Serves Next.js on 3000; WC at http://localhost:3000/wc/nextjs-body.js
```

### React Middle

```bash
cd react-middle
npm run dev
# Dev server at 5174; Shell loads /src/wc-entry.tsx as module
```

No separate WC build needed for **dev**: the Shell loads the Vite dev entry. For **production**, run `npm run build` and serve `dist/` (e.g. on 5174); Shell should use `react-middle.js` and `react-middle.css`.

### Vue Footer

```bash
cd vue-footer
npm run dev
# Dev server at 5175; Shell loads /src/wc-entry.ts as module
```

Same as React: in dev the Shell loads the source entry; for production, build and serve `dist/`.

---

## 4. Run the Shell

With all MFE dev servers (and, for Angular, the WC static server) running:

```bash
cd shell
npm run dev
```

Open **http://localhost:5173**. The Shell will load each MFE from the URLs in `shell/src/mfe-config.ts`.

---

## 5. Summary of commands (copy-paste)

```bash
# From polyglot-mfe/

# Install all
npm run install:all

# Build MFEs that need a separate WC build
cd angular-header && npm run build:wc && cd ..
cd nextjs-body && npm run build:wc && cd ..

# Then in separate terminals (or use a process manager):
# Terminal 1 – Angular WC (serve built output)
cd angular-header && npx serve dist/wc -p 4200

# Terminal 2 – Next.js
cd nextjs-body && npm run dev

# Terminal 3 – React
cd react-middle && npm run dev

# Terminal 4 – Vue
cd vue-footer && npm run dev

# Terminal 5 – Shell
cd shell && npm run dev
# Open http://localhost:5173
```

---

## Folder structure reference

```
polyglot-mfe/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SETUP-COMMANDS.md
│   ├── RUN-INSTRUCTIONS.md
│   ├── COMMON-ERRORS.md
│   └── DEPLOYMENT.md
├── shell/
│   ├── src/
│   │   ├── main.ts
│   │   ├── mfe-config.ts
│   │   ├── load-mfe.ts
│   │   └── shell.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── angular-header/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app/
│   │   │   ├── app.config.ts
│   │   │   └── header/
│   │   │       └── header.component.ts
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig*.json
├── nextjs-body/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── MainBody.tsx
│   ├── wc/
│   │   └── wc-entry.tsx
│   ├── public/
│   │   └── wc/
│   │       └── nextjs-body.js  (after build:wc)
│   ├── next.config.mjs
│   ├── rollup.wc.config.mjs
│   ├── package.json
│   └── tsconfig*.json
├── react-middle/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── wc-entry.tsx
│   │   ├── MiddleSection.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
├── vue-footer/
│   ├── src/
│   │   ├── main.ts
│   │   ├── wc-entry.ts
│   │   ├── App.vue
│   │   ├── Footer.vue
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
├── package.json
└── README.md
```
