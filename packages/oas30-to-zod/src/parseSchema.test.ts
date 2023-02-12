import { describe, test, expect } from 'vitest'

import { emptyContext as ctx } from '@tests/const.js'
import { parseSchema } from '@/parseSchema.js'

ctx.options = {
  withDesc: true,
}

describe('parseSchema', () => {
  test('Non-object', () => {
    /* @ts-ignore */
    expect(parseSchema('', ctx)).toMatchInlineSnapshot('"z.unknown()"')
  })

  test('Standalone', () => {
    expect(
      parseSchema(
        {
          type: 'object',
          required: ['Prop2'],
          properties: {
            Prop1: {
              type: 'string',
              pattern: '[a-z]+',
              default: 'alpha',
              description: 'beta',
            },
            Prop2: {
              type: 'number',
            },
          },
        },
        {
          options: { withAnchors: true, withDesc: true },
          parsers: {
            numberParser: () => 'dummy',
          },
        }
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().regex(new RegExp("^[a-z]+$")).default("alpha").describe("beta").optional(),"Prop2":dummy})"'
    )
  })
})
