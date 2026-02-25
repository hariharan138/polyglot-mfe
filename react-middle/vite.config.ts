import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/wc-entry.tsx',
      name: 'ReactMiddle',
      fileName: 'react-middle',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        extend: true,
        entryFileNames: 'react-middle.js',
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'style.css' : 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 5174,
    cors: true,
    // Disabling HMR prevents @vitejs/plugin-react from injecting the preamble check
    // into each component file, which would throw when loaded from the Shell (another origin/page).
    hmr: false,
  },
});
