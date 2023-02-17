import { join, dirname } from 'node:path'

import preact from '@preact/preset-vite'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  root: join(dirname(new URL(import.meta.url).pathname), `client`),
  plugins: [preact()],
})
