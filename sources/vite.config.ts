import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
  root: resolve('./browser'),
  resolve: {
    alias: {
      '@': resolve('./browser'),
      '@assets': resolve('./browser/assets'),
      '@components': resolve('./browser/components'),
      '@views': resolve('./browser/views'),
      '@shared': resolve('../shared')
    }
  },
  build: {
    outDir: resolve('../client_packages/browser'),
    sourcemap: false
  }
});
