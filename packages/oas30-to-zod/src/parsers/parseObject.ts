import { red } from 'ansis/colors'
import type { OpenAPIV3 } from 'openapi-types'

import { parseSchema } from '@/parseSchema.js'
import type {
  NonArraySchemaObject,
  ObjectParser,
  ParseContext,
  ReferenceObject,
  SchemaObject,
} from '@/types/index.js'

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
  const children = parseProperties(schema, ctx)

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

const parseProperties = (
  schema: OpenAPIV3.NonArraySchemaObject,
  ctx: ParseContext
) =>
  Object.entries(schema.properties ?? {}).map(([childName, childSchema]) => {
    const parsedChild = parseSchema(childSchema, ctx)
    const parsed = `${JSON.stringify(childName)}:${parsedChild}`

    // Referenced component has `.default()`
    if (
      !ctx.options.withoutDefaults &&
      !parsedChild.startsWith('z.') &&
      ctx.graph.hasDefault[parsedChild] === true
    ) {
      return parsed
    }

    if (
      // No need to add `.optional()` if `.default()` exists
      (!ctx.options.withoutDefaults && 'default' in childSchema) ||
      !schema.required ||
      !schema.required.includes(childName)
    )
      return `${parsed}.optional()`

    return parsed
  })

const parseWithoutChildren = (
  addProps: boolean | ReferenceObject | SchemaObject,
  ctx: ParseContext
) => {
  if (typeof addProps === 'object')
    return `z.record(${parseSchema(addProps, ctx)})`

  if (addProps === false) return 'z.object({}).strict()'

  return 'z.record(z.any())'
}
