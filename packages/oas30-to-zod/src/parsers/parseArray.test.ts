import { describe, test, expect } from 'vitest'

import { parseArray } from '@/parsers/parseArray.js'
import type { ArraySchemaObject } from '@/types/index.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseArray', () => {
  test('Empty', () => {
    expect(
      parseArray(
        {
          type: 'array',
        } as ArraySchemaObject,
        ctx
      )
    ).toMatchInlineSnapshot('"z.array(z.any())"')
  })

  test('Range', () => {
    expect(
      parseArray(
        {
          type: 'array',
          minItems: 1,
          maxItems: 5,
          items: {
            type: 'string',
          },
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.array(z.string()).min(1).max(5)"')
  })

  test('Length', () => {
    expect(
      parseArray(
        {
          type: 'array',
          minItems: 3,
          maxItems: 3,
          items: {
            type: 'integer',
          },
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.array(z.number().int()).length(3)"')
  })
})
