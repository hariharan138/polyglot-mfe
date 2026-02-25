import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/wc-entry.ts',
      name: 'VueFooter',
      fileName: 'vue-footer',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        extend: true,
        entryFileNames: 'vue-footer.js',
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'style.css' : 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 5175,
    cors: true,
    // Disabling HMR prevents the vue plugin from injecting preamble checks that throw
    // when the script is loaded from the Shell (a different origin/page).
    hmr: false,
  },
});
