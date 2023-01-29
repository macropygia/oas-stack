import type { ArrayParser } from '../types/index.js'
import { parseSchema } from '../parseSchema.js'

export const parseArray: ArrayParser = (schema, ctx) => {
  if (typeof ctx.parsers?.arrayParser === 'function')
    return ctx.parsers.arrayParser(schema, ctx)

  const fragments = ['z']

  if (!schema.items) fragments.push('.array(z.any())')
  else fragments.push(`.array(${parseSchema(schema.items, ctx)})`)

  if (
    typeof schema.minItems === 'number' &&
    schema.minItems === schema.maxItems
  ) {
    fragments.push(`.length(${schema.maxItems})`)
  } else {
    if (typeof schema.minItems === 'number')
      fragments.push(`.min(${schema.minItems})`)
    if (typeof schema.maxItems === 'number')
      fragments.push(`.max(${schema.maxItems})`)
  }

  return fragments.join('')
}
