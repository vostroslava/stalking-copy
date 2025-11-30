import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  server: {
    watch: {
      // Используем polling, чтобы обойти проблемы с fsevents на части систем
      usePolling: true,
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        catalog: path.resolve(__dirname, 'src/catalog.html'),
        'instrumenty-liderskogo-obshcheniya': path.resolve(__dirname, 'src/programs/instrumenty-liderskogo-obshcheniya.html'),
      },
    },
  },
});
