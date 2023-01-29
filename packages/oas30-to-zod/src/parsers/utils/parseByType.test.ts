import { describe, test, expect } from 'vitest'

import type { ParseContext } from '../../types/index.js'

import { parseByType } from './parseByType.js'

const ctx: ParseContext = {
  options: {},
  name: 'Component',
}

describe('parseByType', () => {
  test('reference', () => {
    expect(
      parseByType(
        {
          $ref: '#/components/schemas/Component',
        },
        ctx
      )
    ).toBe('Component')
  })

  test('nullable', () => {
    expect(
      parseByType({ type: 'string', nullable: true }, ctx)
    ).toMatchInlineSnapshot('"z.string().nullable()"')
  })

  test('allOf', () => {
    expect(parseByType({ allOf: [] }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  // Unsupported
  test('anyOf', () => {
    expect(parseByType({ anyOf: [] }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('oneOf', () => {
    expect(parseByType({ oneOf: [{}, {}] }, ctx)).toMatchInlineSnapshot(
      '"z.union([z.undefined(),z.undefined()])"'
    )
  })

  // Unsupported
  test('not', () => {
    expect(parseByType({ not: {} }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('object', () => {
    expect(parseByType({ type: 'object' }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('array', () => {
    expect(
      parseByType({ type: 'array', items: {} }, ctx)
    ).toMatchInlineSnapshot('"z.array(z.undefined())"')
  })

  test('enum', () => {
    expect(parseByType({ enum: [] }, ctx)).toMatchInlineSnapshot('"z.enum([])"')
  })

  test('string', () => {
    expect(parseByType({ type: 'string' }, ctx)).toMatchInlineSnapshot(
      '"z.string()"'
    )
  })

  test('number', () => {
    expect(parseByType({ type: 'number' }, ctx)).toMatchInlineSnapshot(
      '"z.number()"'
    )
  })

  test('integer', () => {
    expect(parseByType({ type: 'integer' }, ctx)).toMatchInlineSnapshot(
      '"z.number().int()"'
    )
  })

  test('boolean', () => {
    expect(parseByType({ type: 'boolean' }, ctx)).toMatchInlineSnapshot(
      '"z.boolean()"'
    )
  })

  test('default', () => {
    expect(parseByType({}, ctx)).toMatchInlineSnapshot('"z.undefined()"')
  })
})
