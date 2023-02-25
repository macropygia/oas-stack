import { describe, test, expect } from 'vitest'

import { verifyOptions } from '@/utils/verifyOptions.js'

describe('verifyOptions', () => {
  test('Invalid output', async () => {
    await expect(() =>
      verifyOptions({
        output: '/dev/null/minimum.ts',
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Error: ENOTDIR: not a directory, scandir \'/dev/null\'"'
    )
  })

  test('External template does not exists', async () => {
    await expect(() =>
      verifyOptions({
        template: 'nothing.ts.ejs',
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"EJS template does not exists: nothing.ts.ejs"'
    )
  })
})
