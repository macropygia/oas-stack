import { describe, test, expect } from 'vitest'

import { half } from './half.js'

describe('half', () => {
  test('default', () => {
    expect(half([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
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

  test('empty', () => {
    expect(half([])).toMatchInlineSnapshot(`
      [
          [],
          [],
      ]
    `)
  })
})
