# Polyglot Micro Frontend — Architecture

## Text Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SHELL APP (Host)                                        │
│                     Port: 5173 • Vite + Vanilla TS                                │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  Dynamic Loader: fetches script/style for each MFE by config, then renders   │ │
│  │  <angular-header />  <nextjs-body />  <react-middle />  <vue-footer />       │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          ▼                             ▼                             ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  ANGULAR HEADER     │    │  NEXT.JS MAIN BODY   │    │  REACT MIDDLE        │
│  Port: 4200         │    │  Port: 3000          │    │  Port: 5174          │
│  Web Component:     │    │  Web Component:      │    │  Web Component:      │
│  <angular-header>   │    │  <nextjs-body>       │    │  <react-middle>       │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
          │                             │                             │
          └─────────────────────────────┼─────────────────────────────┘
                                        ▼
                          ┌─────────────────────┐
                          │  VUE 3 FOOTER       │
                          │  Port: 5175         │
                          │  Web Component:     │
                          │  <vue-footer>       │
                          └─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  RUNTIME FLOW                                                                     │
│  1. Shell loads index.html → loads shell.js                                       │
│  2. Shell reads MFE config (name, script URL, style URL, tag name)                │
│  3. For each MFE: inject <link rel="stylesheet"> and <script type="module">       │
│  4. When script runs, it registers custom element (e.g. customElements.define)   │
│  5. Shell renders <angular-header>, <nextjs-body>, <react-middle>, <vue-footer>  │
│  6. Each custom element mounts its framework (Angular/React/Vue/Next.js)          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  BUILD & DEPLOY                                                                   │
│  Each MFE builds to static assets (JS + CSS). Shell and MFEs can be deployed     │
│  to different origins; Shell loads MFE URLs from environment/config.              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Technology Matrix

| Section    | Framework   | Port | Custom Element     | Build Tool        |
|-----------|-------------|------|--------------------|-------------------|
| Header    | Angular     | 4200 | `<angular-header>` | Angular CLI       |
| Main Body | Next.js     | 3000 | `<nextjs-body>`    | Next.js + Rollup  |
| Middle    | React       | 5174 | `<react-middle>`   | Vite              |
| Footer    | Vue 3       | 5175 | `<vue-footer>`     | Vite              |
| Shell     | Vanilla TS  | 5173 | —                  | Vite              |

## Design Decisions

- **Web Components**: No iframes; each MFE is a custom element. Framework runs inside the element’s shadow DOM or light DOM (framework-dependent).
- **Dynamic loading**: Shell does not bundle MFEs; it loads script/style URLs from config so MFEs can be deployed and versioned independently.
- **Ports**: Each app has its own dev server for independent development and to simulate separate deployments.
