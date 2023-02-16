import { join, dirname } from 'node:path'

import preact from '@preact/preset-vite'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

const isDev = process.argv.includes('--dev') ? true : false
const rootFragment = isDev ? 'src' : 'dist'
// const rootFragment = 'src'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(
    dirname(new URL(import.meta.url).pathname),
    `${rootFragment}/client`
  ),
  plugins: [preact()],
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/client/index.html',
    },
  },
})
