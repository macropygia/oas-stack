import fse from 'fs-extra'
import { describe, test, expect } from 'vitest'

import { format, getPrettierOptions } from './format.js'

describe('format', () => {
  test('default', () => {
    expect(format(`const foo='bar'`)).toMatchInlineSnapshot(`
      "const foo = "bar";
      "
    `)
  })

  test('project', () => {
    expect(format(`const foo='bar'`, true)).toMatchInlineSnapshot(`
      "const foo = 'bar'
      "
    `)
  })

  test('object', () => {
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

  test('missing', () => {
    fse.moveSync('../../.prettierrc', '../../.notprettierrc')

    expect(format(`const foo='bar'`, true)).toMatchInlineSnapshot(`
      "const foo = "bar";
      "
    `)

    fse.moveSync('../../.notprettierrc', '../../.prettierrc')
  })

  test('getPrettierOptions', () => {
    expect(getPrettierOptions()).toMatchInlineSnapshot(`
      {
          "semi": false,
          "singleQuote": true,
      }
    `)
  })
})
