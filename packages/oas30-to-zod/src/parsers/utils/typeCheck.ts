import type {
  MixedObject,
  ReferenceObject,
  SchemaObject,
  SchemaType,
} from '../../types/index.js'

// primitives
export const isPrimitive = <
  T extends 'string' | 'number' | 'integer' | 'boolean'
>(
  x: SchemaObject,
  p: T
): x is SchemaObject & { type: T } => x.type === p

// object
export const isObject = (
  x: SchemaObject
): x is SchemaObject & { type: 'object' } => x.type === 'object'

// array
export const isArray = (
  x: SchemaObject
): x is SchemaObject & { type: 'array' } => x.type === 'array'

// enum
export const isEnum = (
  x: SchemaObject
): x is SchemaObject & { enum: SchemaType[] } =>
  'enum' in x && x.enum !== undefined

// allOf, anyOf, oneOf, not
export const isAllOf = (
  x: SchemaObject
): x is SchemaObject & { allOf: MixedObject[] } =>
  'allOf' in x && x.allOf !== undefined

export const isAnyOf = (
  x: SchemaObject
): x is SchemaObject & { anyOf: MixedObject[] } =>
  'anyOf' in x && x.anyOf !== undefined

export const isOneOf = (
  x: SchemaObject
): x is SchemaObject & { oneOf: MixedObject[] } =>
  'oneOf' in x && x.oneOf !== undefined

export const isNot = (
  x: SchemaObject
): x is SchemaObject & { not: MixedObject } => 'not' in x && x.not !== undefined

// $ref
export const isReference = (
  x: MixedObject
): x is ReferenceObject & { $ref: string } =>
  '$ref' in x && x.$ref !== undefined

// nullable (3.0 only)
export const isNullable = (
  x: SchemaObject
): x is SchemaObject & { nullable: true } =>
  (x as SchemaObject).nullable === true
