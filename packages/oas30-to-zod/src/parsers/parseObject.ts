import { parseSchema } from '@/parseSchema.js'
import { red } from '@/utils/ansi'

import type {
  NonArraySchemaObject,
  ObjectParser,
  ParseContext,
  ReferenceObject,
  SchemaObject,
  MixedObject,
} from '@/types/index.js'

type ObjectSchema = NonArraySchemaObject & {
  type: 'object'
}
type ObjectSchemaWithProps = ObjectSchema & {
  properties: Record<string, MixedObject>
}
type ObjectSchemaWithoutProps = ObjectSchema & {
  additionalProperties: boolean | ReferenceObject | SchemaObject
}

export const parseObject: ObjectParser = (schema, ctx) => {
  if (typeof ctx.parsers?.objectParser === 'function')
    return ctx.parsers.objectParser(schema, ctx)

  if (typeof schema.properties === 'object')
    return parseWithProps(schema as ObjectSchemaWithProps, ctx)

  if (
    typeof schema.additionalProperties === 'boolean' ||
    typeof schema.additionalProperties === 'object'
  )
    return parseWithoutProps(schema as ObjectSchemaWithoutProps, ctx)

  console.error(
    ctx.name,
    red(`'object' has neither 'properties' nor 'additionalProperties'.`)
  )
  return 'z.undefined()'
}

/**
 * Parse object schema with properties
 * @param schema - Object schema with properties
 * @param ctx - Context
 * @returns Zod schema
 */
const parseWithProps = (schema: ObjectSchemaWithProps, ctx: ParseContext) => {
  const isPartial = !hasRequiredChild(schema)
  const partialFragment = isPartial ? '.partial()' : ''

  const props = parseProperties(schema, ctx, isPartial)

  if (schema.additionalProperties === true)
    return `z.object({${props}})${partialFragment}.catchall(z.any())`

  if (schema.additionalProperties === false)
    return `z.object({${props}})${partialFragment}.strict()`

  if (typeof schema.additionalProperties === 'object')
    return `z.object({${props}})${partialFragment}.catchall(${parseSchema(
      schema.additionalProperties,
      ctx
    )})`

  return `z.object({${props}})${partialFragment}`
}

/**
 * Find out if the object schema has the required property
 * @param schema - Object schema with properties
 * @returns boolean
 */
const hasRequiredChild = (schema: ObjectSchemaWithProps): boolean => {
  if (
    schema.required &&
    schema.required.filter((requiredProp) => schema.properties[requiredProp])
      .length
  )
    return true

  return false
}

/**
 * Parse properties
 * @param schema - Object schema with properties
 * @param ctx - Context
 * @param shouldOmitOptional - Should omit `.optional()`
 * @returns Zod schema
 */
const parseProperties = (
  schema: ObjectSchemaWithProps,
  ctx: ParseContext,
  shouldOmitOptional: boolean
) =>
  Object.entries(schema.properties).map(([propName, propSchema]) => {
    const parsedProp = parseSchema(propSchema, ctx)
    const parsed = `${JSON.stringify(propName)}:${parsedProp}`

    // Referenced component has `.default()`
    if (
      !ctx.options.withoutDefaults &&
      !parsedProp.startsWith('z.') &&
      ctx.graph.hasDefault[parsedProp] === true
    )
      return parsed

    // No need to add `.optional()` if `.default()` exists
    if (!ctx.options.withoutDefaults && 'default' in propSchema) return parsed

    if (
      !shouldOmitOptional &&
      (!schema.required || !schema.required.includes(propName))
    )
      return `${parsed}.optional()`

    return parsed
  })

/**
 * Parse object schema that only has `additionalProperties`
 * @param schema - Object schema without properties
 * @param ctx - Context
 * @returns Zod schema
 */
const parseWithoutProps = (
  schema: ObjectSchemaWithoutProps,
  ctx: ParseContext
) => {
  const { additionalProperties } = schema

  if (typeof additionalProperties === 'object')
    return `z.record(${parseSchema(additionalProperties, ctx)})`

  if (additionalProperties === false) return 'z.object({}).strict()'

  return 'z.record(z.any())'
}
