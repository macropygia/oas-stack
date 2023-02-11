/// <reference types="vitest" />

import path from 'node:path'

import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', '__tests__/**/*.test.ts'],
    snapshotFormat: { indent: 4, escapeString: false },
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/'),
      '@tests/': path.join(__dirname, './__tests__/'),
    },
  },
})
