/**
 * MFE config: script and style URLs for each micro frontend.
 * In development, use the Shell's proxy (/mfes/*) so the browser only talks to the Shell (avoids CORS).
 * In production, replace with deployed asset URLs.
 */
const isDev = import.meta.env.DEV;

export interface MfeEntry {
  name: string;
  tag: string;
  scriptUrl: string;
  styleUrl?: string;
  /** Optional: multiple script URLs (e.g. Angular polyfills + main) */
  scriptUrls?: string[];
}

// In dev: Angular and Next.js use proxy (same origin). React and Vue use direct URLs so their
// ESM module graph (imports) resolves on the same origin and doesn't 404.
const baseUrls = isDev
  ? {
      angular: '/mfes/angular',
      nextjs: '/mfes/nextjs',
      react: 'http://localhost:5174',
      vue: 'http://localhost:5175',
    }
  : {
      // ↓ Replace these with your actual Vercel deployment URLs
      angular: import.meta.env.VITE_ANGULAR_URL ?? 'https://polyglot-angular.vercel.app',
      nextjs:  import.meta.env.VITE_NEXTJS_URL  ?? 'https://polyglot-nextjs.vercel.app',
      react:   import.meta.env.VITE_REACT_URL   ?? 'https://polyglot-react.vercel.app',
      vue:     import.meta.env.VITE_VUE_URL     ?? 'https://polyglot-vue.vercel.app',
    };

export const mfeConfig: MfeEntry[] = [
  {
    name: 'angular-header',
    tag: 'angular-header',
    // Angular build outputs to dist/wc/browser/ when using --output-path dist/wc
    scriptUrl: `${baseUrls.angular}/browser/main.js`,
    styleUrl: `${baseUrls.angular}/browser/styles.css`,
  },
  {
    name: 'nextjs-body',
    tag: 'nextjs-body',
    scriptUrl: `${baseUrls.nextjs}/wc/nextjs-body.js`,
  },
  {
    name: 'react-middle',
    tag: 'react-middle',
    scriptUrl: isDev
      ? `${baseUrls.react}/src/wc-entry.tsx`
      : `${baseUrls.react}/react-middle.js`,
    styleUrl: isDev ? undefined : `${baseUrls.react}/react-middle.css`,
  },
  {
    name: 'vue-footer',
    tag: 'vue-footer',
    scriptUrl: isDev
      ? `${baseUrls.vue}/src/wc-entry.ts`
      : `${baseUrls.vue}/vue-footer.js`,
    styleUrl: isDev ? undefined : `${baseUrls.vue}/vue-footer.css`,
  },
];
