import type { OpenAPIV3 } from 'openapi-types'

import { parseSchema } from '@/parseSchema.js'
import type { NullableParser } from '@/types/index.js'

export const parseNullable: NullableParser = (schema, ctx) => {
  if (typeof ctx.parsers?.nullableParser === 'function')
    return ctx.parsers.nullableParser(schema, ctx)

  return `${parseSchema(
    { ...schema, nullable: false } as OpenAPIV3.SchemaObject,
    ctx
  )}.nullable()`
}
