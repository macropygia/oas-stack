import { parseSchema } from '@/parseSchema.js'
import { red, yellow } from '@/utils/ansi'

import type { AnyOfParser } from '@/types/index.js'

export const parseAnyOf: AnyOfParser = (schema, ctx) => {
  if (typeof ctx.parsers?.anyOfParser === 'function')
    return ctx.parsers.anyOfParser(schema, ctx)

  if (!Array.isArray(schema.anyOf) || schema.anyOf.length === 0) {
    console.error(ctx.name, red(`'anyOf' is empty or not an array.`))
    return 'z.undefined()'
  }

  if (schema.anyOf.length === 1) {
    console.log(ctx.name, yellow(`'anyOf' has only one element.`))
    return parseSchema(schema.anyOf[0]!, ctx)
  }

  console.error(
    ctx.name,
    red(`'anyOf' with multiple elements is currently not supported.`)
  )
  return `z.undefined()`
}
