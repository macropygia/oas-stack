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

  test('Nested object', async () => {
    await expect(
      oasComponentsToZod('__tests__/partial.yml', {
        ...minimizeOutput,
      })
    ).resolves.toMatchInlineSnapshot(`
      "const WithDefault = z.string().default("alpha");
      const WithoutDefault = z.string();
      const Comp1 = z.object({ Prop1: z.string(), Prop2: z.string() }).partial();
      const Comp2 = z
        .object({
          Prop1: WithDefault,
          Prop2: WithoutDefault,
          Prop3: z.object({
            Prop3_1: WithDefault,
            Prop3_2: WithoutDefault,
            Prop3_3: z
              .object({ Prop3_3_1: z.string(), Prop3_3_2: z.string().default("foo") })
              .partial()
              .optional(),
          }),
        })
        .partial();
      const Comp3 = z.object({ Prop1: z.string(), Prop2: z.string() }).partial();
      "
    `)
  })
})
