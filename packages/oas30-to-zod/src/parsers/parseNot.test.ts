import { describe, test, expect } from 'vitest'

import { parseNot } from '@/parsers/parseNot.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseNot', () => {
  test('Default', () => {
    expect(
      parseNot(
        {
          not: {
            type: 'string',
          },
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })
})
