import { describe, test, expect } from 'vitest'

import { parseBoolean } from '@/parsers/parseBoolean.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseBoolean', () => {
  test('Default', () => {
    expect(
      parseBoolean(
        {
          type: 'boolean',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.boolean()"')
  })
})
