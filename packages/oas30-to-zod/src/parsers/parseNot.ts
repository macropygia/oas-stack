import { magenta } from '@/utils/ansi'

import type { NotParser } from '@/types/index.js'

export const parseNot: NotParser = (schema, ctx) => {
  if (typeof ctx.parsers?.notParser === 'function')
    return ctx.parsers.notParser(schema, ctx)

  console.error(ctx.name, magenta(`'not' is currently not supported.`))
  return 'z.undefined()'
}
