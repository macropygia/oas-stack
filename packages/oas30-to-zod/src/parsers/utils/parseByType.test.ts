import { describe, test, expect } from 'vitest'

import { emptyContext as ctx } from '@tests/const.js'
import { parseByType } from '@/parsers/utils/parseByType.js'

describe('parseByType', () => {
  test('Reference', () => {
    expect(
      parseByType(
        {
          $ref: '#/components/schemas/Component',
        },
        ctx
      )
    ).toBe('Component')
  })

  test('Nullable', () => {
    expect(
      parseByType({ type: 'string', nullable: true }, ctx)
    ).toMatchInlineSnapshot('"z.string().nullable()"')
  })

  test('AllOf', () => {
    expect(parseByType({ allOf: [] }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  // Unsupported
  test('AnyOf', () => {
    expect(parseByType({ anyOf: [] }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('OneOf', () => {
    expect(parseByType({ oneOf: [{}, {}] }, ctx)).toMatchInlineSnapshot(
      '"z.union([z.undefined(),z.undefined()])"'
    )
  })

  // Unsupported
  test('Not', () => {
    expect(parseByType({ not: {} }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('Object', () => {
    expect(parseByType({ type: 'object' }, ctx)).toMatchInlineSnapshot(
      '"z.undefined()"'
    )
  })

  test('Array', () => {
    expect(
      parseByType({ type: 'array', items: {} }, ctx)
    ).toMatchInlineSnapshot('"z.array(z.undefined())"')
  })

  test('Enum', () => {
    expect(parseByType({ enum: [] }, ctx)).toMatchInlineSnapshot(
      '"z.union([])"'
    )
  })

  test('String', () => {
    expect(parseByType({ type: 'string' }, ctx)).toMatchInlineSnapshot(
      '"z.string()"'
    )
  })

  test('Number', () => {
    expect(parseByType({ type: 'number' }, ctx)).toMatchInlineSnapshot(
      '"z.number()"'
    )
  })

  test('Integer', () => {
    expect(parseByType({ type: 'integer' }, ctx)).toMatchInlineSnapshot(
      '"z.number().int()"'
    )
  })

  test('Boolean', () => {
    expect(parseByType({ type: 'boolean' }, ctx)).toMatchInlineSnapshot(
      '"z.boolean()"'
    )
  })

  test('Default', () => {
    expect(parseByType({}, ctx)).toMatchInlineSnapshot('"z.undefined()"')
  })
})
