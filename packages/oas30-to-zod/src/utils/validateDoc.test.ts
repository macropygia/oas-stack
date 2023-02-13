import { describe, test, expect } from 'vitest'

import {
  isV3,
  hasComponents,
  hasSchemas,
  isValidDoc,
} from '@/utils/validateDoc.js'
import { minimumDocument } from '@tests/const'

const docWithoutComponents = {
  openapi: '3.0.0',
  info: {
    title: 'title',
    version: '1.0.0',
  },
  paths: {},
}

describe('validateDoc', () => {
  test('isV3: valid', () => {
    expect(isV3(minimumDocument)).toBeTruthy()
  })

  test('isV3: invlaid', () => {
    expect(
      isV3({
        ...minimumDocument,
        openapi: '3.1.0',
      })
    ).toBeFalsy()
  })

  test('hasComponents: valid', () => {
    expect(hasComponents(minimumDocument)).toBeTruthy()
  })

  test('hasComponents: invalid', () => {
    expect(hasComponents(docWithoutComponents)).toBeFalsy()
  })

  test('hasSchemas: valid', () => {
    expect(hasSchemas({ schemas: {} })).toBeTruthy()
  })

  test('hasSchemas: invlaid', () => {
    expect(hasSchemas({})).toBeFalsy()
  })

  test('isValidDoc: valid', () => {
    expect(isValidDoc(minimumDocument)).toBeTruthy()
  })

  test('isValidDoc: invalid', () => {
    expect(isValidDoc(docWithoutComponents)).toBeFalsy()
  })
})
