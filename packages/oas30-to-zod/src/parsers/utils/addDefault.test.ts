import { describe, test, expect } from 'vitest'

import { addDefault } from './addDefault.js'

describe('addDefault', () => {
  test('default exists', () => {
    expect(addDefault({ default: 1 }, 'z.number()')).toMatchInlineSnapshot(
      '"z.number().default(1)"'
    )
  })
  test('default does not exists', () => {
    expect(addDefault({}, 'z.number()')).toMatchInlineSnapshot('"z.number()"')
  })
})
