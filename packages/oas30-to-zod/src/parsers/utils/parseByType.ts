import { parseAllOf } from '../parseAllOf.js'
import { parseAnyOf } from '../parseAnyOf.js'
import { parseArray } from '../parseArray.js'
import { parseBoolean } from '../parseBoolean.js'
import { parseDefault } from '../parseDefault.js'
import { parseEnum } from '../parseEnum.js'
import { parseNot } from '../parseNot.js'
import { parseNullable } from '../parseNullable.js'
import { parseNumber } from '../parseNumber.js'
import { parseObject } from '../parseObject.js'
import { parseOneOf } from '../parseOneOf.js'
import { parseReference } from '../parseReference.js'
import { parseString } from '../parseString.js'

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
