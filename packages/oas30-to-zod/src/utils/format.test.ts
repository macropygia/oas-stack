import fse from 'fs-extra'
import { describe, test, expect } from 'vitest'

import { format, getPrettierOptions } from '@/utils/format.js'

describe('format', () => {
  test('Default', () => {
    expect(format(`const foo='bar'`)).toMatchInlineSnapshot(`
      "const foo = "bar";
      "
    `)
  })

  test('Use project settings', () => {
    expect(format(`const foo='bar'`, true)).toMatchInlineSnapshot(`
      "const foo = 'bar'
      "
    `)
  })

  test('Try to use project settings but missing', () => {
    fse.moveSync('../../.prettierrc', '../../.notprettierrc')

    expect(format(`const foo='bar'`, true)).toMatchInlineSnapshot(`
      "const foo = "bar";
      "
    `)

    fse.moveSync('../../.notprettierrc', '../../.prettierrc')
  })

  test('Setting directly by the object', () => {
    expect(
      format(`const foo='bar'`, {
        singleQuote: false,
        semi: false,
      })
    ).toMatchInlineSnapshot(`
      "const foo = "bar"
      "
    `)
  })
})

describe('getPrettierOptions', () => {
  test('Default', () => {
    expect(getPrettierOptions()).toMatchInlineSnapshot(`
      {
          "semi": false,
          "singleQuote": true,
      }
    `)
  })
})
