import { magenta } from 'ansis/colors'

import { addDefault } from '@/parsers/utils/addDefault.js'
import { addDesc } from '@/parsers/utils/addDesc.js'
import { parseByType } from '@/parsers/utils/parseByType.js'

import type { MixedObject, ParseContext, ParseOptions } from '@/types/index.js'

const defaultParseOptions: ParseOptions = {
  withoutDefaults: false,
  withDesc: false,
  withAnchors: false,
}

/**
 * Parse schema object
 * @param schema - Schema object
 * @param partialContext - Context object
 * @returns Parsed string
 */
const parseSchema = (
  schema: MixedObject,
  partialContext?: Partial<ParseContext>
): string => {
  const ctx: ParseContext = {
    ...{
      options: {},
      graph: { deps: {}, isObject: {}, isNullable: {}, hasDefault: {} },
      name: 'UnnamedSchema',
      deps: [],
      data: {},
    },
    ...partialContext,
  }

  ctx.options = { ...defaultParseOptions, ...ctx.options }
  const { withoutDefaults, withDesc } = ctx.options

  if (typeof schema !== 'object') {
    console.error(magenta`Input is not an object. Returns 'z.unknown()'.`)
    return 'z.unknown()'
  }

  let parsed = parseByType(schema, ctx)

  // Convert `schema.default` to `.default()`
  if (!withoutDefaults) parsed = addDefault(schema, parsed)

  // Convert `schema.description` to `.describe()`
  if (withDesc) parsed = addDesc(schema, parsed)

  return parsed
}

export { defaultParseOptions, parseSchema }
