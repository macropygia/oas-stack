import type { EnumParser } from '../types/index.js'

export const parseEnum: EnumParser = (schema, ctx) => {
  if (typeof ctx.parsers?.enumParser === 'function')
    return ctx.parsers.enumParser(schema, ctx)

  if (Array.isArray(schema.enum)) {
    if (schema.enum.every((x) => typeof x === 'string'))
      return `z.enum([${schema.enum.map((x) => JSON.stringify(x))}])`
    else if (schema.enum.length === 1)
      return `z.literal(${JSON.stringify(schema.enum[0])})`
    else
      return `z.union([${schema.enum.map(
        (x) => `z.literal(${JSON.stringify(x)})`
      )}])`
  }

  return `z.literal(${JSON.stringify(schema.enum)})`
}
