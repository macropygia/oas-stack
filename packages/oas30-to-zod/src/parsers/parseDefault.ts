import { magenta } from '@/utils/ansi'

import type { DefaultParser } from '@/types/index.js'

export const parseDefault: DefaultParser = (schema, ctx) => {
  if (typeof ctx.parsers?.defaultParser === 'function')
    return ctx.parsers.defaultParser(schema, ctx)

  console.error(ctx.name, magenta(`Schema did not match any parser.`))
  return 'z.undefined()'
}
