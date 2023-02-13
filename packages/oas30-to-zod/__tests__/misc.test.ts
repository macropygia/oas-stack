import { describe, test, expect } from 'vitest'

import { oasComponentsToZod } from '@/oasComponentsToZod.js'
import { minimizeOutput } from '@tests/const.js'

describe('Misc', async () => {
  test('Nullable with default', async () => {
    await expect(
      oasComponentsToZod('__tests__/nullable.yml', {
        ...minimizeOutput,
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Nullable = z.string().nullable();
      const NullableWithDefault = z.string().default("alpha").nullable();
      "
    `)
  })

  test('Complex regex', async () => {
    await expect(
      oasComponentsToZod('__tests__/regex.yml', {
        ...minimizeOutput,
      })
    ).resolves.toMatchSnapshot()
  })
})
