import { parseAllOf } from '@/parsers/parseAllOf.js'
import { parseAnyOf } from '@/parsers/parseAnyOf.js'
import { parseArray } from '@/parsers/parseArray.js'
import { parseBoolean } from '@/parsers/parseBoolean.js'
import { parseDefault } from '@/parsers/parseDefault.js'
import { parseEnum } from '@/parsers/parseEnum.js'
import { parseNot } from '@/parsers/parseNot.js'
import { parseNullable } from '@/parsers/parseNullable.js'
import { parseNumber } from '@/parsers/parseNumber.js'
import { parseObject } from '@/parsers/parseObject.js'
import { parseOneOf } from '@/parsers/parseOneOf.js'
import { parseReference } from '@/parsers/parseReference.js'
import { parseString } from '@/parsers/parseString.js'
import type { MixedObject, ParseContext } from '@/types/index.js'
import {
  isAllOf,
  isAnyOf,
  isArray,
  isEnum,
  isNot,
  isNullable,
  isObject,
  isOneOf,
  isPrimitive,
  isReference,
} from '@/parsers/utils/typeCheck.js'

/**
 * Parse OAS schema to Zod schema
 * @param schema - OAS Schema
 * @param ctx - Context
 * @returns Zod schemas (string)
 */
export const parseByType = (schema: MixedObject, ctx: ParseContext): string => {
  // Reference
  if (isReference(schema)) return parseReference(schema, ctx) // keyword

  // Schema
  if (isNullable(schema)) return parseNullable(schema, ctx) // property

  if (isAllOf(schema)) return parseAllOf(schema, ctx) // keyword
  if (isAnyOf(schema)) return parseAnyOf(schema, ctx) // keyword
  if (isOneOf(schema)) return parseOneOf(schema, ctx) // keyword
  if (isNot(schema)) return parseNot(schema, ctx) // keyword

  if (isObject(schema)) return parseObject(schema, ctx) // type
  if (isArray(schema)) return parseArray(schema, ctx) // type
  if (isEnum(schema)) return parseEnum(schema, ctx) // type
  // enum needs to come before than primitives
  if (isPrimitive(schema, 'string')) return parseString(schema, ctx) // type
  if (isPrimitive(schema, 'number')) return parseNumber(schema, ctx) // type
  if (isPrimitive(schema, 'integer')) return parseNumber(schema, ctx) // type
  if (isPrimitive(schema, 'boolean')) return parseBoolean(schema, ctx) // type

  return parseDefault(schema, ctx)
}
