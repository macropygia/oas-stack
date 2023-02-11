import { describe, test, expect } from 'vitest'

import { minimumContext as ctx } from './const.js'

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

/* @ts-ignore */
const dummyParser = (schema: any, ctx: any) => 'dummy' // eslint-disable-line

ctx.parsers = {
  referenceParser: dummyParser,
  nullableParser: dummyParser,
  objectParser: dummyParser,
  arrayParser: dummyParser,
  anyOfParser: dummyParser,
  allOfParser: dummyParser,
  oneOfParser: dummyParser,
  notParser: dummyParser,
  enumParser: dummyParser,
  stringParser: dummyParser,
  numberParser: dummyParser,
  booleanParser: dummyParser,
  defaultParser: dummyParser,
}

describe('External Parser', () => {
  test('Reference', () => {
    expect(parseReference({ $ref: '#/components/schema/Component' }, ctx)).toBe(
      'dummy'
    )
  })

  test('Nullable', () => {
    expect(parseNullable({ type: 'string', nullable: true }, ctx)).toBe('dummy')
  })

  test('AllOf', () => {
    expect(parseAllOf({ allOf: [] }, ctx)).toBe('dummy')
  })

  test('AnyOf', () => {
    expect(parseAnyOf({ anyOf: [] }, ctx)).toBe('dummy')
  })

  test('OneOf', () => {
    expect(parseOneOf({ oneOf: [{}, {}] }, ctx)).toBe('dummy')
  })

  test('Not', () => {
    expect(parseNot({ not: {} }, ctx)).toBe('dummy')
  })

  test('Object', () => {
    expect(parseObject({ type: 'object' }, ctx)).toBe('dummy')
  })

  test('Array', () => {
    expect(parseArray({ type: 'array', items: {} }, ctx)).toBe('dummy')
  })

  test('Enum', () => {
    expect(parseEnum({ enum: [] }, ctx)).toBe('dummy')
  })

  test('String', () => {
    expect(parseString({ type: 'string' }, ctx)).toBe('dummy')
  })

  test('Number/Integer', () => {
    expect(parseNumber({ type: 'number' }, ctx)).toBe('dummy')
  })

  test('Boolean', () => {
    expect(parseBoolean({ type: 'boolean' }, ctx)).toBe('dummy')
  })

  test('Default', () => {
    expect(parseDefault({}, ctx)).toBe('dummy')
  })
})
