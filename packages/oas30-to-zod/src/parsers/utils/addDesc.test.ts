import { describe, test, expect } from 'vitest'

import { addDesc } from './addDesc.js'

describe('addDesc', () => {
  test('description exists', () => {
    expect(
      addDesc({ description: 'description' }, 'z.number()')
    ).toMatchInlineSnapshot('"z.number().describe("description")"')
  })
  test('description does not exists', () => {
    expect(addDesc({}, 'z.number()')).toMatchInlineSnapshot('"z.number()"')
  })
})
