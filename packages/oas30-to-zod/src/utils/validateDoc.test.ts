import { describe, test, expect } from 'vitest'

import { validateDoc, isV3, hasComponents } from '@/utils/validateDoc.js'
import { minimumDocument } from '@tests/const'

const doc31 = {
  ...minimumDocument,
  openapi: '3.1.0',
}

const docWithoutComponents = {
  openapi: '3.0.0',
  info: {
    title: 'title',
    version: '1.0.0',
  },
  paths: {},
}

const docWithoutSchemas = {
  openapi: '3.0.0',
  info: {
    title: 'title',
    version: '1.0.0',
  },
  paths: {},
  components: {},
}

describe('validateDoc', () => {
  test('isV3: valid', () => {
    expect(isV3(minimumDocument)).toBeTruthy()
  })

  test('isV3: invlaid', () => {
    expect(isV3(doc31)).toBeFalsy()
  })

  test('hasComponents: valid', () => {
    expect(hasComponents(minimumDocument)).toBeTruthy()
  })

  test('hasComponents: invalid (missing components)', () => {
    expect(hasComponents(docWithoutComponents)).toBeFalsy()
  })

  test('hasComponents: invalid (missing schemas)', () => {
    expect(hasComponents(docWithoutSchemas)).toBeFalsy()
  })

  test('Version mismatch', async () => {
    await expect(() =>
      validateDoc(doc31, {})
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Only version 3.0 is supported."'
    )
  })

  test('Document has no components', async () => {
    await expect(() =>
      validateDoc(docWithoutComponents, {})
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Document has no \'components\'."'
    )
  })

  test('Components has no schemas', async () => {
    await expect(() =>
      validateDoc(docWithoutSchemas, {})
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Document has no \'components\'."'
    )
  })
})
