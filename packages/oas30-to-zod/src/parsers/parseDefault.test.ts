import { describe, test, expect } from 'vitest'

import { parseDefault } from '@/parsers/parseDefault.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseDefault', () => {
  test('Default', () => {
    expect(parseDefault({}, ctx)).toMatchInlineSnapshot('"z.undefined()"')
  })
})
