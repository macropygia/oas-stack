import { describe, test, expect } from 'vitest'

import { minimumOutput } from '@tests/const.js'
import { oasComponentsToZod } from '@/oasComponentsToZod.js'

describe('Misc', async () => {
  test('graph.isNullable', async () => {
    await expect(
      oasComponentsToZod('__tests__/nullable.yml', {
        ...minimumOutput,
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
        ...minimumOutput,
      })
    ).resolves.toMatchSnapshot()
  })
})
