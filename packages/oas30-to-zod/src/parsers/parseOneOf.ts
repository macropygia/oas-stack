import { red, yellow } from 'ansis/colors'

import { parseSchema } from '@/parseSchema.js'
import type { OneOfParser } from '@/types/index.js'

export const parseOneOf: OneOfParser = (schema, ctx) => {
  if (typeof ctx.parsers?.oneOfParser === 'function')
    return ctx.parsers.oneOfParser(schema, ctx)

  if (!Array.isArray(schema.oneOf) || schema.oneOf.length === 0) {
    console.error(ctx.name, red`'oneOf' is empty or not an array.`)
    return 'z.undefined()'
  }

  if (schema.oneOf.length === 1) {
    console.log(ctx.name, yellow`'oneOf' has only one element.`)
    return parseSchema(schema.oneOf[0]!, ctx)
  }

  return `z.union([${schema.oneOf.map((schema) => parseSchema(schema, ctx))}])`
}
