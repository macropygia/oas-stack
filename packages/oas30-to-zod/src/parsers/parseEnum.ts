import type { EnumParser } from '@/types/index.js'

export const parseEnum: EnumParser = (schema, ctx) => {
  if (typeof ctx.parsers?.enumParser === 'function')
    return ctx.parsers.enumParser(schema, ctx)

  if (Array.isArray(schema.enum)) {
    // if (schema.enum.every((elm) => typeof elm === 'string'))
    //   return `z.enum([${schema.enum.map((elm) => JSON.stringify(elm))}])`
    if (schema.type === 'string')
      return `z.enum([${schema.enum.map((elm) =>
        JSON.stringify(elm.toString())
      )}])`
    else if (schema.enum.length === 1)
      return `z.literal(${JSON.stringify(schema.enum[0])})`
    else
      return `z.union([${schema.enum.map(
        (elm) => `z.literal(${JSON.stringify(elm)})`
      )}])`
  }

  return `z.literal(${JSON.stringify(schema.enum)})`
}
