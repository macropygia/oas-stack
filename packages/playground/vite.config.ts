import { join, dirname } from 'node:path'

import preact from '@preact/preset-vite'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

const isDev = process.env['NODE_ENV'] !== 'production' ? true : false
const rootFragment = isDev ? 'src' : 'dist'

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
