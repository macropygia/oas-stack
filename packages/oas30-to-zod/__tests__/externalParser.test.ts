import { describe, test, expect } from 'vitest'

import { parseAllOf } from '../src/parsers/parseAllOf.js'
import { parseAnyOf } from '../src/parsers/parseAnyOf.js'
import { parseArray } from '../src/parsers/parseArray.js'
import { parseBoolean } from '../src/parsers/parseBoolean.js'
import { parseDefault } from '../src/parsers/parseDefault.js'
import { parseEnum } from '../src/parsers/parseEnum.js'
import { parseNot } from '../src/parsers/parseNot.js'
import { parseNullable } from '../src/parsers/parseNullable.js'
import { parseNumber } from '../src/parsers/parseNumber.js'
import { parseObject } from '../src/parsers/parseObject.js'
import { parseOneOf } from '../src/parsers/parseOneOf.js'
import { parseReference } from '../src/parsers/parseReference.js'
import { parseString } from '../src/parsers/parseString.js'

import { minimumContext as ctx } from './const.js'

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
