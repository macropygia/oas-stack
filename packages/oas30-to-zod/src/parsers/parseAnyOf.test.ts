import { describe, test, expect } from 'vitest'

import { parseAnyOf } from '@/parsers/parseAnyOf.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseAnyOf', () => {
  test('Empty', () => {
    expect(
      parseAnyOf(
        {
          anyOf: [],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })

  test('Single element: Internal reference', () => {
    expect(
      parseAnyOf(
        {
          anyOf: [{ $ref: '#/components/schemas/Comp1' }],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"Comp1"')
  })

  test('Multiple elements: Internal reference', () => {
    expect(
      parseAnyOf(
        {
          anyOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: '#/components/schemas/Comp2' },
          ],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })
})
