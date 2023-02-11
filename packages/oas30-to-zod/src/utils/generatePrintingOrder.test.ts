import { describe, test, expect } from 'vitest'

import { generatePrintingOrder } from '@/utils/generatePrintingOrder.js'

describe('generatePrintingOrder', () => {
  test('Default', () => {
    expect(
      generatePrintingOrder({
        c1: ['c6'],
        c2: [],
        c3: ['c5'],
        c4: ['c6'],
        c5: ['c1', 'c7'],
        c6: [],
        c7: [],
      })
    ).toMatchInlineSnapshot(`
      [
          "c2",
          "c6",
          "c7",
          "c1",
          "c4",
          "c5",
          "c3",
      ]
    `)
  })
})
