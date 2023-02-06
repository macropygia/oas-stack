import { describe, test, expect } from 'vitest'

import { getComponentNameFromRef } from './getComponentNameFromRef.js'

describe('getComponentNameFromRef', () => {
  test('`description` exists', () => {
    expect(getComponentNameFromRef('#/components/schemas/Component')).toBe(
      'Component'
    )
  })
  test('`description` does not exists', () => {
    expect(
      getComponentNameFromRef('another.yml#/path/to/COomponent')
    ).toBeFalsy()
  })
})
