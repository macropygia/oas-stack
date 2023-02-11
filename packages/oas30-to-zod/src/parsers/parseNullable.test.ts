import { describe, test, expect } from 'vitest'

import { parseNullable } from '@/parsers/parseNullable.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseNullable', () => {
  test('Default', () => {
    expect(
      parseNullable(
        {
          type: 'string',
          nullable: true,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().nullable()"')
  })
})
