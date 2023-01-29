import { describe, test, expect } from 'vitest'

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
} from './typeCheck.js'

describe('typeCheck', () => {
  test('reference', () => {
    expect(isReference({ $ref: '#/components/schemas/Component' })).toBeTruthy()
  })

  test('not reference', () => {
    expect(isReference({})).toBeFalsy()
  })

  test('nullable', () => {
    expect(isNullable({ nullable: true })).toBeTruthy()
  })

  test('not nullable', () => {
    expect(isNullable({})).toBeFalsy()
  })

  test('allOf', () => {
    expect(isAllOf({ allOf: [] })).toBeTruthy()
  })

  test('not allOf', () => {
    expect(isAllOf({})).toBeFalsy()
  })

  test('anyOf', () => {
    expect(isAnyOf({ anyOf: [] })).toBeTruthy()
  })

  test('not anyOf', () => {
    expect(isAnyOf({})).toBeFalsy()
  })

  test('oneOf', () => {
    expect(isOneOf({ oneOf: [] })).toBeTruthy()
  })

  test('not oneOf', () => {
    expect(isOneOf({})).toBeFalsy()
  })

  test('not', () => {
    expect(isNot({ not: {} })).toBeTruthy()
  })

  test('not not', () => {
    expect(isNot({})).toBeFalsy()
  })

  test('object', () => {
    expect(isObject({ type: 'object' })).toBeTruthy()
  })

  test('not object', () => {
    expect(isObject({})).toBeFalsy()
  })

  test('array', () => {
    expect(isArray({ type: 'array', items: {} })).toBeTruthy()
  })

  test('not array', () => {
    expect(isArray({})).toBeFalsy()
  })

  test('enum', () => {
    expect(isEnum({ enum: [] })).toBeTruthy()
  })

  test('not enum', () => {
    expect(isEnum({})).toBeFalsy()
  })

  test('string', () => {
    expect(isPrimitive({ type: 'string' }, 'string')).toBeTruthy()
  })

  test('not string', () => {
    expect(isPrimitive({}, 'string')).toBeFalsy()
  })

  test('number', () => {
    expect(isPrimitive({ type: 'number' }, 'number')).toBeTruthy()
  })

  test('not number', () => {
    expect(isPrimitive({}, 'number')).toBeFalsy()
  })

  test('integer', () => {
    expect(isPrimitive({ type: 'integer' }, 'integer')).toBeTruthy()
  })

  test('not integer', () => {
    expect(isPrimitive({}, 'integer')).toBeFalsy()
  })

  test('boolean', () => {
    expect(isPrimitive({ type: 'boolean' }, 'boolean')).toBeTruthy()
  })

  test('not boolean', () => {
    expect(isPrimitive({}, 'boolean')).toBeFalsy()
  })
})
