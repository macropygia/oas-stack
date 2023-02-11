import type { BooleanParser } from '@/types/index.js'

export const parseBoolean: BooleanParser = (schema, ctx) => {
  if (typeof ctx.parsers?.booleanParser === 'function')
    return ctx.parsers.booleanParser(schema, ctx)

  return 'z.boolean()'
}
