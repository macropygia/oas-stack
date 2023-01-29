import { describe, test, expect } from 'vitest'

import { parseSchema } from './parseSchema.js'
import type { ParseContext } from './types/index.js'

const ctx: ParseContext = {
  options: {
    withDesc: true,
  },
  name: 'Component',
}

describe('parseSchema', () => {
  test('default', () => {
    expect(
      parseSchema(
        { type: 'string', description: 'description', default: 'default' },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.string().describe("description").default("default")"'
    )
  })

  test('non-object', () => {
    /* @ts-ignore */
    expect(parseSchema('', ctx)).toMatchInlineSnapshot('"z.unknown()"')
  })
})
