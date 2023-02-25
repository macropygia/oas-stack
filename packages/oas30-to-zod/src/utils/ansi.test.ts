import { describe, test, expect } from 'vitest'

import { cyan, magenta, yellow, green, red } from '@/utils/ansi.js'

import { escapeControlCharacters } from './escapeControlCharacters'

describe('ansi', () => {
  test('cyan', () => {
    expect(escapeControlCharacters(cyan('cyan'))).toMatchInlineSnapshot(
      '"\\x1b[36mcyan\\x1b[39m"'
    )
  })
  test('magenta', () => {
    expect(escapeControlCharacters(magenta('magenta'))).toMatchInlineSnapshot(
      '"\\x1b[35mmagenta\\x1b[39m"'
    )
  })
  test('yellow', () => {
    expect(escapeControlCharacters(yellow('yellow'))).toMatchInlineSnapshot(
      '"\\x1b[33myellow\\x1b[39m"'
    )
  })
  test('green', () => {
    expect(escapeControlCharacters(green('green'))).toMatchInlineSnapshot(
      '"\\x1b[32mgreen\\x1b[39m"'
    )
  })
  test('red', () => {
    expect(escapeControlCharacters(red('red'))).toMatchInlineSnapshot(
      '"\\x1b[31mred\\x1b[39m"'
    )
  })
})
