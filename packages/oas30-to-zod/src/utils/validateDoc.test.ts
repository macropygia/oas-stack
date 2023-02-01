import { describe, test, expect } from 'vitest'

import { isV3, hasComponents, hasSchemas, isValidDoc } from './validateDoc.js'

const minimumDoc = {
  openapi: '3.0.0',
  info: {
    title: 'title',
    version: '1.0.0',
  },
  paths: {},
}

describe('validateDoc', () => {
  test('isV3: valid', () => {
    expect(isV3(minimumDoc)).toBeTruthy()
  })

  test('isV3: invlaid', () => {
    expect(
      isV3({
        ...minimumDoc,
        openapi: '3.1.0',
      })
    ).toBeFalsy()
  })

  test('hasComponents: valid', () => {
    expect(
      hasComponents({
        ...minimumDoc,
        components: {},
      })
    ).toBeTruthy()
  })

  test('hasComponents: invalid', () => {
    expect(hasComponents(minimumDoc)).toBeFalsy()
  })

  test('hasSchemas: valid', () => {
    expect(hasSchemas({ schemas: {} })).toBeTruthy()
  })

  test('hasSchemas: invlaid', () => {
    expect(hasSchemas({})).toBeFalsy()
  })

  test('isValidDoc: valid', () => {
    expect(
      isValidDoc({
        ...minimumDoc,
        components: {
          schemas: {},
        },
      })
    ).toBeTruthy()
  })

  test('isValidDoc: invalid', () => {
    expect(isValidDoc(minimumDoc)).toBeFalsy()
  })
})
