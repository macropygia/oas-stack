import type {
  MixedObject,
  ReferenceObject,
  SchemaObject,
  SchemaType,
} from '@/types/index.js'

/**
 * string, number, integer, boolean
 * @param schema - OAS Schema
 * @param type - Type
 * @returns boolean
 */
export const isPrimitive = <
  T extends 'string' | 'number' | 'integer' | 'boolean'
>(
  schema: SchemaObject,
  type: T
): schema is SchemaObject & { type: T } => schema.type === type

/**
 * object
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isObject = (
  schema: SchemaObject
): schema is SchemaObject & { type: 'object' } => schema.type === 'object'

/**
 * array
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isArray = (
  schema: SchemaObject
): schema is SchemaObject & { type: 'array' } => schema.type === 'array'

/**
 * enum
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isEnum = (
  schema: SchemaObject
): schema is SchemaObject & { enum: SchemaType[] } =>
  'enum' in schema && schema.enum !== undefined

/**
 * allOf
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isAllOf = (
  schema: SchemaObject
): schema is SchemaObject & { allOf: MixedObject[] } =>
  'allOf' in schema && schema.allOf !== undefined

/**
 * anyOf
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isAnyOf = (
  schema: SchemaObject
): schema is SchemaObject & { anyOf: MixedObject[] } =>
  'anyOf' in schema && schema.anyOf !== undefined

/**
 * oneOf
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isOneOf = (
  schema: SchemaObject
): schema is SchemaObject & { oneOf: MixedObject[] } =>
  'oneOf' in schema && schema.oneOf !== undefined

/**
 * not
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isNot = (
  schema: SchemaObject
): schema is SchemaObject & { not: MixedObject } =>
  'not' in schema && schema.not !== undefined

/**
 * $ref
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isReference = (
  schema: MixedObject
): schema is ReferenceObject & { $ref: string } =>
  '$ref' in schema && schema.$ref !== undefined

/**
 * nullable
 * @param schema - OAS Schema
 * @returns boolean
 */
export const isNullable = (
  schema: SchemaObject
): schema is SchemaObject & { nullable: true } =>
  (schema as SchemaObject).nullable === true
