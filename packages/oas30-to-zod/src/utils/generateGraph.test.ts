import { describe, test, expect } from 'vitest'

import { generateGraph } from '@/utils/generateGraph'
import { minimumDocument } from '@tests/const'

import type { Document } from '@/types'

describe('generateGraph', () => {
  test('Default', () => {
    const doc: Document = Object.assign({}, minimumDocument)
    doc.components.schemas = {
      Obj: {
        type: 'object',
      },
      Nullable: {
        type: 'string',
        nullable: true,
      },
      HasDefault: {
        type: 'string',
        default: 'foo',
      },
    }
    expect(generateGraph(doc)).toMatchInlineSnapshot(`
      {
          "deps": {},
          "hasDefault": {
              "HasDefault": true,
              "Nullable": false,
              "Obj": false,
          },
          "isNullable": {
              "HasDefault": false,
              "Nullable": true,
              "Obj": false,
          },
          "isObject": {
              "HasDefault": false,
              "Nullable": false,
              "Obj": true,
          },
      }
    `)
  })
})
