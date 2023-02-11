import { describe, test, expect } from 'vitest'

import { parseOneOf } from '@/parsers/parseOneOf.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseOneOf', () => {
  test('Empty', () => {
    expect(
      parseOneOf(
        {
          oneOf: [],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })

  test('Single element: Internal reference', () => {
    expect(
      parseOneOf(
        {
          oneOf: [{ $ref: '#/components/schemas/Comp1' }],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"Comp1"')
  })

  test('Multiple elements: Internal reference', () => {
    expect(
      parseOneOf(
        {
          oneOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: '#/components/schemas/Comp2' },
          ],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.union([Comp1,Comp2])"')
  })

  test('Multiple elements: Primitives', () => {
    expect(
      parseOneOf(
        {
          oneOf: [{ type: 'string' }, { type: 'number' }],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.union([z.string(),z.number()])"')
  })
})
