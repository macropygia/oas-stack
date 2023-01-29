import { describe, test, expect } from 'vitest'

import { format } from './format.js'

describe('format', () => {
  test('default', () => {
    expect(format('const foo=1')).toMatchInlineSnapshot(`
      "const foo = 1;
      "
    `)
  })
})
