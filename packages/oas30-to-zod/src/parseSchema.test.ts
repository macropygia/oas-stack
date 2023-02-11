import { describe, test, expect } from 'vitest'

import { emptyContext as ctx } from '@tests/const.js'
import { parseSchema } from '@/parseSchema.js'

ctx.options = {
  withDesc: true,
}

describe('parseSchema', () => {
  test('Default', () => {
    expect(
      parseSchema(
        { type: 'string', description: 'description', default: 'default' },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.string().describe("description").default("default")"'
    )
  })

  test('Non-object', () => {
    /* @ts-ignore */
    expect(parseSchema('', ctx)).toMatchInlineSnapshot('"z.unknown()"')
  })
})
