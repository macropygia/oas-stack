import { describe, test, expect } from 'vitest'

import { parseObject } from '@/parsers/parseObject.js'
import { emptyContext as ctx } from '@tests/const.js'
import type { SchemaObject } from '@/types/index.js'

describe('parseObject', () => {
  test('Basic', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: {
            Prop1: { type: 'string' },
            Prop2: { type: 'number' },
          },
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().optional(),"Prop2":z.number().optional()})"'
    )
  })

  test('Require', () => {
    expect(
      parseObject(
        {
          type: 'object',
          required: ['Prop1', 'Prop2'],
          properties: {
            Prop1: { type: 'string' },
            Prop2: { type: 'number' },
          },
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string(),"Prop2":z.number()})"'
    )
  })

  test('References', () => {
    // Comp3 has `.default()`
    const graph = {
      deps: {},
      isObject: {},
      isNullable: {},
      hasDefault: {
        Comp3: true,
      },
    }

    expect(
      parseObject(
        {
          type: 'object',
          required: ['Prop2'],
          properties: {
            Prop1: { $ref: '#/components/schemas/Comp1' },
            Prop2: { $ref: '#/components/schemas/Comp2' },
            Prop3: { $ref: '#/components/schemas/Comp3' },
          },
        },
        { ...ctx, ...{ graph } }
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":Comp1.optional(),"Prop2":Comp2,"Prop3":Comp3})"'
    )
  })

  test('Additional: true', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: {
            Prop1: { type: 'string' },
          },
          additionalProperties: true,
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().optional()}).catchall(z.any())"'
    )
  })

  test('Additional: false', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: {
            Prop1: { type: 'string' },
          },
          additionalProperties: false,
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().optional()}).strict()"'
    )
  })

  test('Additional: string', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: {
            Prop1: { type: 'string' },
          },
          additionalProperties: { type: 'string' },
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().optional()}).catchall(z.string())"'
    )
  })

  test('Additional: $ref', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: {
            Prop1: {
              type: 'string',
            },
          },
          additionalProperties: { $ref: '#/components/schemas/Comp1' },
        },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.object({"Prop1":z.string().optional()}).catchall(Comp1)"'
    )
  })

  test('Only additional: true', () => {
    expect(
      parseObject(
        {
          type: 'object',
          additionalProperties: true,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.record(z.any())"')
  })

  test('Only additional: false', () => {
    expect(
      parseObject(
        {
          type: 'object',
          additionalProperties: false,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.object({}).strict()"')
  })

  test('Only additional: string', () => {
    expect(
      parseObject(
        {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.record(z.string())"')
  })

  test('Only additional: $ref', () => {
    expect(
      parseObject(
        {
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/Comp1' },
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.record(Comp1)"')
  })

  test('Empty', () => {
    expect(
      parseObject(
        {
          type: 'object',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })

  test('Empty (undefined)', () => {
    expect(
      parseObject(
        {
          type: 'object',
          properties: undefined,
        } as SchemaObject & { type: 'object'; properties?: undefined },
        ctx
      )
    ).toMatchInlineSnapshot('"z.object({})"')
  })
})
