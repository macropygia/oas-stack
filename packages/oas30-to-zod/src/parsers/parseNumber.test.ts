import { describe, test, expect } from 'vitest'

import { parseNumber } from '@/parsers/parseNumber.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseNumber', () => {
  test('Number', () => {
    expect(
      parseNumber(
        {
          type: 'number',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number()"')
  })

  test('Integer', () => {
    expect(
      parseNumber(
        {
          type: 'integer',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().int()"')
  })

  test('Integer (int32)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          format: 'int32',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().int()"')
  })

  test('Integer (int64)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          format: 'int64',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().int()"')
  })

  test('Integer (multipleOf=1)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          multipleOf: 1,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().int()"')
  })

  test('Range', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          minimum: 0,
          maximum: 10,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().gte(0).lte(10)"')
  })

  test('Range (invalid)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          minimum: 10,
          maximum: 0,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().gte(10).lte(0)"')
  })

  test('MultipleOf', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          multipleOf: 10,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().multipleOf(10)"')
  })

  test('MultipleOf (negative)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          multipleOf: -1,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().multipleOf(-1)"')
  })

  test('MultipleOf (float)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          multipleOf: 0.1,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().multipleOf(0.1)"')
  })

  test('Range (exclusive)', () => {
    expect(
      parseNumber(
        {
          type: 'number',
          minimum: 0,
          exclusiveMinimum: true,
          maximum: 10,
          exclusiveMaximum: true,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.number().gt(0).lt(10)"')
  })
})
