import { describe, test, expect } from 'vitest'

import type { ArraySchemaObject } from '../types/index.js'
import { minimumContext as ctx } from '@tests/const.js'

import { parseArray } from './parseArray.js'

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
