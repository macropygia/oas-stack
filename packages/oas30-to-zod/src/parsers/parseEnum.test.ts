import { describe, test, expect } from 'vitest'

import { parseEnum } from '@/parsers/parseEnum.js'
import { emptyContext as ctx } from '@tests/const.js'

import type { NonArraySchemaObject } from '@/types/index.js'

describe('parseEnum', () => {
  test('String (multiple)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: ['alpha', 'beta'],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.enum(["alpha","beta"])"')
  })

  test('String (single)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: ['alpha'],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.enum(["alpha"])"')
  })

  test('String (empty)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: [],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.enum([])"')
  })

  test('String (include number)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: ['alpha', 123],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.enum(["alpha","123"])"')
  })

  test('Number (multiple)', () => {
    expect(
      parseEnum(
        {
          type: 'number',
          enum: [1.23, 45.6],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.union([z.literal(1.23),z.literal(45.6)])"')
  })

  test('Number (single)', () => {
    expect(
      parseEnum(
        {
          type: 'integer',
          enum: [1],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.literal(1)"')
  })

  test('Number (empty)', () => {
    expect(
      parseEnum(
        {
          type: 'number',
          enum: [],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.union([])"')
  })

  test('Integer (multiple)', () => {
    expect(
      parseEnum(
        {
          type: 'integer',
          enum: [123, 456],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.union([z.literal(123),z.literal(456)])"')
  })

  test('`enum` is not an array (string)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: 'alpha',
        } as NonArraySchemaObject & { enum: string },
        ctx
      )
    ).toMatchInlineSnapshot('"z.literal("alpha")"')
  })

  test('`enum` is not an array (number)', () => {
    expect(
      parseEnum(
        {
          type: 'string',
          enum: 123,
        } as NonArraySchemaObject & { enum: number },
        ctx
      )
    ).toMatchInlineSnapshot('"z.literal(123)"')
  })
})
