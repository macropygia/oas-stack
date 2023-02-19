import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],
  output: 'server',
  adapter: vercel(),
})
