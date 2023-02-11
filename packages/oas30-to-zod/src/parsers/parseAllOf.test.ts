import { describe, test, expect } from 'vitest'

import { parseAllOf } from '@/parsers/parseAllOf.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseAllOf', () => {
  test('Empty', () => {
    expect(
      parseAllOf(
        {
          allOf: [],
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.undefined()"')
  })

  test('Multiple elements: References', () => {
    expect(
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: '#/components/schemas/Comp2' },
          ],
        },
        {
          ...ctx,
          ...{
            graph: {
              deps: {},
              isObject: {
                Comp1: true,
                Comp2: true,
              },
              isNullable: {},
              hasDefault: {},
            },
          },
        }
      )
    ).toMatchInlineSnapshot('"Comp1.merge(Comp2)"')
  })

  test('Multiple elements: Mixed', () => {
    expect(
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Comp1' },
            {
              type: 'object',
              properties: {
                Prop1: { type: 'string' },
              },
            },
          ],
        },
        {
          ...ctx,
          ...{
            graph: {
              deps: {},
              isObject: {
                Comp1: true,
              },
              isNullable: {},
              hasDefault: {},
            },
          },
        }
      )
    ).toMatchInlineSnapshot(
      '"Comp1.merge(z.object({"Prop1":z.string().optional()}))"'
    )
  })

  test('Multiple elements: Includes non-object schema', () => {
    expect(
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: '#/components/schemas/Comp2' },
          ],
        },
        {
          ...ctx,
          ...{
            graph: {
              deps: {},
              isObject: {
                Comp1: true,
              },
              isNullable: {},
              hasDefault: {},
            },
          },
        }
      )
    ).toMatchInlineSnapshot('"z.intersection(Comp1,Comp2)"')
  })

  test('Multiple elements: Includes invalid schema', () => {
    expect(() =>
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: '#/path/to/Comp2' },
          ],
        },
        ctx
      )
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })

  test('Multiple elements: References include external reference', () => {
    expect(() =>
      parseAllOf(
        {
          allOf: [
            { $ref: '#/components/schemas/Comp1' },
            { $ref: 'external.yml#/path/to/Comp2' },
          ],
        },
        ctx
      )
    ).toThrowErrorMatchingInlineSnapshot(
      '"\'$ref\' references an unknown object."'
    )
  })
})
