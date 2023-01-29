import type { MixedObject, ParseContext, ParseOptions } from './types/index.js'
import { addDefault } from './parsers/utils/addDefault.js'
import { addDesc } from './parsers/utils/addDesc.js'
import { parseByType } from './parsers/utils/parseByType.js'

const defaultParseOptions: ParseOptions = {
  withoutDefaults: false,
  withDesc: false,
  withAnchors: false,
}

const parseSchema = (schema: MixedObject, ctx: ParseContext): string => {
  ctx.options = { ...defaultParseOptions, ...ctx.options }
  const { withoutDefaults, withDesc } = ctx.options

  if (typeof schema !== 'object') return 'z.unknown()'

  let parsed = parseByType(schema, ctx)

  // Convert `schema.description` to `.describe()`
  if (withDesc) parsed = addDesc(schema, parsed)

  // Convert `schema.default` to `.default()`
  if (!withoutDefaults) parsed = addDefault(schema, parsed)

  return parsed
}

export { defaultParseOptions, parseSchema }
