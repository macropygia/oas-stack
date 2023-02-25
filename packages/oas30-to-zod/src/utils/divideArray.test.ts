import { describe, test, expect } from 'vitest'

import { divideArray } from '@/utils/divideArray.js'

describe('divideArray', () => {
  test('Default', () => {
    expect(divideArray([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
      [
          [
              1,
              2,
          ],
          [
              3,
              4,
              5,
          ],
      ]
    `)
  })

  test('Empty', () => {
    expect(divideArray([])).toMatchInlineSnapshot(`
      [
          [],
          [],
      ]
    `)
  })
})
