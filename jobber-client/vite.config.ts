import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tscongPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  optimizeDeps: {
    esbuildOptions: {
      target: 'ESNext'
    }
  },
  plugins: [
    react({
      include: '**/*.tsx'
    }),
    tscongPaths()
  ],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  build: {
    outDir: './build',
    target: 'ESNext'
  },
  esbuild: {
    target: 'ESNext'
  },
  server: {
    port: 3000
  }
});
