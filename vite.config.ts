import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
  root: resolve('./sources/browser'),
  resolve: {
    alias: {
      '@browser': resolve('./sources/browser'),
      '@assets': resolve('./sources/browser/assets'),
      '@components': resolve('./sources/browser/components'),
      '@views': resolve('./sources/browser/views'),
      '@shared': resolve('./sources/shared')
    }
  },
  build: {
    outDir: resolve('./dist/client_packages/browser'),
    sourcemap: false
  }
});
