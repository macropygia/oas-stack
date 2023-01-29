/* eslint-disable no-control-regex */

/**
 * Escape C0/C1 control characters and non-character.
 * @param str - Raw string
 * @returns Escaped string
 */
export const escapeControlCharacters = (str: string): string => {
  return str
    .replace(/\t/g, '\\t') // U+0009
    .replace(/\n/g, '\\n') // U+000A
    .replace(/\r/g, '\\r') // U+000D
    .replace(
      /([\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uFFFE\uFFFF])/g,
      (_m, p) => {
        const dec: number = p.codePointAt()
        const hex: string = dec.toString(16)
        if (dec <= 0xff) return `\\x${`00${hex}`.slice(-2)}`
        return `\\u${`0000${hex}`.slice(-4)}`
      }
    )
}
