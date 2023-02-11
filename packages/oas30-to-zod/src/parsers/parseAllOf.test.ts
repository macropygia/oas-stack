import { describe, test, expect } from 'vitest'

import { parseAllOf } from './parseAllOf.js'

import { minimumContext as ctx } from '@tests/const.js'

describe('parseAllOf', () => {
  test('Multiple elements with internal reference', () => {
    expect(
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Component1' },
            { $ref: '#/components/schemas/Component2' },
          ],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.intersection(Component1,Component2)"')
  })

  test('Multiple elements with invalid internal reference', () => {
    expect(() =>
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Component' },
            { $ref: '#/path/to/Component' },
          ],
        },
        ctx
      )
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })

  test('Multiple elements with external reference', () => {
    expect(() =>
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Component' },
            { $ref: 'external.yml#/path/to/Component' },
          ],
        },
        ctx
      )
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })
})
