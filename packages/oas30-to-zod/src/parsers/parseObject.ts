import { red } from 'ansis/colors'

import type {
  NonArraySchemaObject,
  ObjectParser,
  ParseContext,
  ReferenceObject,
  SchemaObject,
} from '../types/index.js'
import { parseSchema } from '../parseSchema.js'

export const parseObject: ObjectParser = (schema, ctx) => {
  if (typeof ctx.parsers?.objectParser === 'function')
    return ctx.parsers.objectParser(schema, ctx)

  if ('properties' in schema) return parseChildren(schema, ctx)

  if ('additionalProperties' in schema)
    return parseWithoutChildren(schema.additionalProperties, ctx)

  console.error(
    ctx.name,
    red`'object' has neither 'properties' nor 'additionalProperties'.`
  )
  return 'z.undefined()'
}

const parseChildren = (
  schema: NonArraySchemaObject & { type: 'object' },
  ctx: ParseContext
) => {
  const children = Object.entries(schema.properties ?? {}).map(
    ([key, childSchema]) =>
      `${JSON.stringify(key)}:${parseSchema(childSchema, ctx)}${
        (!ctx.options.withoutDefaults && 'default' in childSchema) || // `.default()` exists
        !schema.required ||
        !schema.required.includes(key)
          ? '.optional()'
          : ''
      }`
  )

  if (schema.additionalProperties === true)
    return `z.object({${children}}).catchall(z.any())`

  if (schema.additionalProperties === false)
    return `z.object({${children}}).strict()`

  if (typeof schema.additionalProperties === 'object')
    return `z.object({${children}}).catchall(${parseSchema(
      schema.additionalProperties,
      ctx
    )})`

  return `z.object({${children}})`
}

const parseWithoutChildren = (
  addProps: boolean | ReferenceObject | SchemaObject,
  ctx: ParseContext
) => {
  if (typeof addProps === 'object')
    return `z.record(${parseSchema(addProps, ctx)})`

  if (addProps === false) return 'z.object({}).strict()'

  return 'z.record(z.any())'
}
