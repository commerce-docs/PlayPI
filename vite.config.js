import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    proxy: {
      '/graphql': 'http://localhost:3001'
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
});
