import preact from '@preact/preset-vite'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: 'public',
  server: {
    port: process.env.VITE_DEV_PORT
      ? parseInt(process.env.VITE_DEV_PORT, 10)
      : 5173,
  },
  preview: {
    port: process.env.VITE_PREVIEW_PORT
      ? parseInt(process.env.VITE_PREVIEW_PORT, 10)
      : 4173,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/index.html',
    },
  },
  plugins: [preact()],
})
