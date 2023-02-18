import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

const adapter = vercel({
  includeFiles: ['api'],
})

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],
  output: 'server',
  adapter,
})
