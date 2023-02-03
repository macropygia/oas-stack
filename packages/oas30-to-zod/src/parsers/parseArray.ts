import type { ArrayParser } from '../types/index.js'
import { parseSchema } from '../parseSchema.js'

export const parseArray: ArrayParser = (schema, ctx) => {
  if (typeof ctx.parsers?.arrayParser === 'function')
    return ctx.parsers.arrayParser(schema, ctx)

  let parsed = !schema.items
    ? 'z.array(z.any())'
    : `z.array(${parseSchema(schema.items, ctx)})`

  if (
    typeof schema.minItems === 'number' &&
    schema.minItems === schema.maxItems
  )
    return `${parsed}.length(${schema.maxItems})`

  if (typeof schema.minItems === 'number')
    parsed = `${parsed}.min(${schema.minItems})`
  if (typeof schema.maxItems === 'number')
    parsed = `${parsed}.max(${schema.maxItems})`

  return parsed
}
