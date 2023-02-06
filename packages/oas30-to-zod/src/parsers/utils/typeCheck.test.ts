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
  test('Reference', () => {
    expect(isReference({ $ref: '#/components/schemas/Component' })).toBeTruthy()
  })

  test('Not reference', () => {
    expect(isReference({})).toBeFalsy()
  })

  test('Nullable', () => {
    expect(isNullable({ nullable: true })).toBeTruthy()
  })

  test('Not nullable', () => {
    expect(isNullable({})).toBeFalsy()
  })

  test('AllOf', () => {
    expect(isAllOf({ allOf: [] })).toBeTruthy()
  })

  test('Not allOf', () => {
    expect(isAllOf({})).toBeFalsy()
  })

  test('AnyOf', () => {
    expect(isAnyOf({ anyOf: [] })).toBeTruthy()
  })

  test('Not anyOf', () => {
    expect(isAnyOf({})).toBeFalsy()
  })

  test('OneOf', () => {
    expect(isOneOf({ oneOf: [] })).toBeTruthy()
  })

  test('Not oneOf', () => {
    expect(isOneOf({})).toBeFalsy()
  })

  test('Not', () => {
    expect(isNot({ not: {} })).toBeTruthy()
  })

  test('Not not', () => {
    expect(isNot({})).toBeFalsy()
  })

  test('Object', () => {
    expect(isObject({ type: 'object' })).toBeTruthy()
  })

  test('Not object', () => {
    expect(isObject({})).toBeFalsy()
  })

  test('Array', () => {
    expect(isArray({ type: 'array', items: {} })).toBeTruthy()
  })

  test('Not array', () => {
    expect(isArray({})).toBeFalsy()
  })

  test('Enum', () => {
    expect(isEnum({ enum: [] })).toBeTruthy()
  })

  test('Not enum', () => {
    expect(isEnum({})).toBeFalsy()
  })

  test('String', () => {
    expect(isPrimitive({ type: 'string' }, 'string')).toBeTruthy()
  })

  test('Not string', () => {
    expect(isPrimitive({}, 'string')).toBeFalsy()
  })

  test('Number', () => {
    expect(isPrimitive({ type: 'number' }, 'number')).toBeTruthy()
  })

  test('Not number', () => {
    expect(isPrimitive({}, 'number')).toBeFalsy()
  })

  test('Integer', () => {
    expect(isPrimitive({ type: 'integer' }, 'integer')).toBeTruthy()
  })

  test('Not integer', () => {
    expect(isPrimitive({}, 'integer')).toBeFalsy()
  })

  test('Boolean', () => {
    expect(isPrimitive({ type: 'boolean' }, 'boolean')).toBeTruthy()
  })

  test('Not boolean', () => {
    expect(isPrimitive({}, 'boolean')).toBeFalsy()
  })
})
