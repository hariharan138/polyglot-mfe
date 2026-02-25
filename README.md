# Polyglot Micro Frontend Landing Page

A learning/demo project showcasing **Micro Frontend Architecture** with four different frameworks composed by a single Shell app. Each section is an independent project exposed as a **Web Component** and loaded dynamically—no iframes.

## Overview

| App | Framework | Port | Role |
|-----|-----------|------|------|
| **shell** | Vanilla TypeScript (Vite) | 5173 | Host; loads and composes all MFEs |
| **angular-header** | Angular | 4200 | Header section |
| **nextjs-body** | Next.js | 3000 | Main body section |
| **react-middle** | React (Vite) | 5174 | Middle section |
| **vue-footer** | Vue 3 (Vite) | 5175 | Footer section |

## Quick Start

1. **Install dependencies** (from repo root):
   ```bash
   cd polyglot-mfe
   npm run install:all
   ```

2. **Build all MFEs** (required before running the shell):
   ```bash
   npm run build:all
   ```

3. **Run all apps** (use 5 terminals, or one with a process manager):
   ```bash
   # Terminal 1 – Angular Header
   npm run dev:angular

   # Terminal 2 – Next.js Body
   npm run dev:nextjs

   # Terminal 3 – React Middle
   npm run dev:react

   # Terminal 4 – Vue Footer
   npm run dev:vue

   # Terminal 5 – Shell (open http://localhost:5173)
   npm run dev:shell
   ```

4. Open **http://localhost:5173** in your browser. The Shell will load each MFE from its dev server URL.

**Important:** You must run **all five** commands (angular, nextjs, react, vue, shell). If only one section (e.g. footer) appears, the other MFE dev servers are likely not running—start them in separate terminals. The Shell proxies MFE requests to avoid CORS.

**Note (Angular):** `dev:angular` serves the **built** WC (`dist/wc`) on port 4200, not `ng serve`. Run `npm run build:all` first so Angular has a build to serve. If your Angular build puts `main.js` at the root of `dist/wc` (not under `browser/`), update `shell/src/mfe-config.ts` to use `scriptUrl: .../main.js` and `styleUrl: .../styles.css`.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Diagram and design
- [Setup & Commands](docs/SETUP-COMMANDS.md) — Step-by-step setup
- [Run Instructions](docs/RUN-INSTRUCTIONS.md) — How to run locally
- [Common Errors](docs/COMMON-ERRORS.md) — Troubleshooting
- [Deployment](docs/DEPLOYMENT.md) — Deployment strategy

## Project Layout

```
polyglot-mfe/
├── docs/                 # Architecture, setup, run, errors, deployment
├── shell/                 # Host app (Vite)
├── angular-header/        # Angular MFE
├── nextjs-body/           # Next.js MFE
├── react-middle/          # React MFE
├── vue-footer/            # Vue 3 MFE
├── package.json           # Root scripts (install:all, build:all, dev:*)
└── README.md
```

## For LinkedIn / Demos

This repo demonstrates:

- **Polyglot micro frontends**: Angular, Next.js, React, and Vue in one page.
- **Web Components as contract**: Each MFE is a custom element; the Shell stays framework-agnostic.
- **Dynamic loading**: Shell loads scripts/styles by URL; no iframes.
- **Independent deployment**: Each app can be built and deployed separately.

Use the docs and code to walk through the architecture and run everything locally for your demo.
