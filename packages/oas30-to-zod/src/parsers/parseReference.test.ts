import { describe, test, expect } from 'vitest'

import type { ParseContext } from '../types/index.js'

import { parseReference } from './parseReference.js'

const ctx: ParseContext = {
  options: {},
  name: 'Component',
}

describe('parseReference', () => {
  test('Internal reference', () => {
    expect(
      parseReference({ $ref: '#/components/schemas/Component' }, ctx)
    ).toBe('Component')
  })

  test('Invalid internal reference', () => {
    expect(() =>
      parseReference({ $ref: '#/path/to/Component' }, ctx)
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })

  test('External reference', () => {
    expect(() =>
      parseReference({ $ref: 'external.yml#/path/to/Component' }, ctx)
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })
})
