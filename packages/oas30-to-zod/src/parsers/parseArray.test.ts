import { describe, test, expect } from 'vitest'

import type { ArraySchemaObject, ParseContext } from '../types/index.js'

import { parseArray } from './parseArray.js'

const ctx: ParseContext = {
  options: {},
}

describe('parseArray', () => {
  test('Array without items', () => {
    expect(
      parseArray(
        {
          type: 'array',
        } as ArraySchemaObject,
        ctx
      )
    ).toMatchInlineSnapshot('"z.array(z.any())"')
  })
})
