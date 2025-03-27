import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import {viteStaticCopy} from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects',
          dest: '.' // скопирует в корень dist
        }
      ]
    }),
  ],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
