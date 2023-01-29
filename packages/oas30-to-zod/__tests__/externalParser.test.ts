import { describe, test, expect } from 'vitest'

import type { ParseContext } from '../src/types/index.js'
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

/* @ts-ignore */
const dummyParser = (schema: any, ctx: any) => 'dummy' // eslint-disable-line

const ctx: ParseContext = {
  options: {},
  name: 'Component',
  parsers: {
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
  },
}

describe('External Parser', () => {
  test('reference', () => {
    expect(parseReference({ $ref: '#/components/schema/Component' }, ctx)).toBe(
      'dummy'
    )
  })

  test('nullable', () => {
    expect(parseNullable({ type: 'string', nullable: true }, ctx)).toBe('dummy')
  })

  test('allOf', () => {
    expect(parseAllOf({ allOf: [] }, ctx)).toBe('dummy')
  })

  test('anyOf', () => {
    expect(parseAnyOf({ anyOf: [] }, ctx)).toBe('dummy')
  })

  test('oneOf', () => {
    expect(parseOneOf({ oneOf: [{}, {}] }, ctx)).toBe('dummy')
  })

  test('not', () => {
    expect(parseNot({ not: {} }, ctx)).toBe('dummy')
  })

  test('object', () => {
    expect(parseObject({ type: 'object' }, ctx)).toBe('dummy')
  })

  test('array', () => {
    expect(parseArray({ type: 'array', items: {} }, ctx)).toBe('dummy')
  })

  test('enum', () => {
    expect(parseEnum({ enum: [] }, ctx)).toBe('dummy')
  })

  test('string', () => {
    expect(parseString({ type: 'string' }, ctx)).toBe('dummy')
  })

  test('number, integer', () => {
    expect(parseNumber({ type: 'number' }, ctx)).toBe('dummy')
  })

  test('boolean', () => {
    expect(parseBoolean({ type: 'boolean' }, ctx)).toBe('dummy')
  })

  test('default', () => {
    expect(parseDefault({}, ctx)).toBe('dummy')
  })
})
