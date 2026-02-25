import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/mfes/angular': { target: 'http://localhost:4200', changeOrigin: true, rewrite: (p) => p.replace(/^\/mfes\/angular/, '') },
      '/mfes/nextjs': { target: 'http://localhost:3000', changeOrigin: true, rewrite: (p) => p.replace(/^\/mfes\/nextjs/, '') },
      '/mfes/react': { target: 'http://localhost:5174', changeOrigin: true, rewrite: (p) => p.replace(/^\/mfes\/react/, '') },
      '/mfes/vue': { target: 'http://localhost:5175', changeOrigin: true, rewrite: (p) => p.replace(/^\/mfes\/vue/, '') },
    },
  },
});
