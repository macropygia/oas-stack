import { describe, test, expect } from 'vitest'

import { parseString } from '@/parsers/parseString.js'
import { emptyContext as ctx } from '@tests/const.js'

describe('parseString', () => {
  test('Default', () => {
    expect(
      parseString(
        {
          type: 'string',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string()"')
  })

  test('Range', () => {
    expect(
      parseString(
        {
          type: 'string',
          minLength: 10,
          maxLength: 20,
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().min(10).max(20)"')
  })

  test('Regex', () => {
    expect(
      parseString(
        {
          type: 'string',
          pattern: '[a-z]+',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().regex(new RegExp("[a-z]+"))"')
  })

  test('Regex with anchors', () => {
    expect(
      parseString(
        {
          type: 'string',
          pattern: '[a-z]+',
        },
        { ...ctx, ...{ options: { withAnchors: true } } }
      )
    ).toMatchInlineSnapshot('"z.string().regex(new RegExp("^[a-z]+$"))"')
  })

  test('Format (email)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'email',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().email()"')
  })

  test('Format (uri)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'uri',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().url()"')
  })

  test('Format (uuid)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'uuid',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().uuid()"')
  })

  test('Format (cuid)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'cuid',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().cuid()"')
  })

  test('Format (cuid2)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'cuid2',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().cuid2()"')
  })

  test('Format (date-time)', () => {
    expect(
      parseString(
        {
          type: 'string',
          format: 'date-time',
        },
        ctx
      )
    ).toMatchInlineSnapshot('"z.string().datetime()"')
  })

  test('Preset', () => {
    expect(
      parseString(
        {
          type: 'string',
          minLength: 10,
          maxLength: 20,
          pattern: '2022+',
          format: 'date-time',
        },
        {
          ...ctx,
          ...{ parsers: { stringParser: 'regex-format-minmax' } },
        }
      )
    ).toMatchInlineSnapshot(
      '"z.string().regex(new RegExp("2022+")).datetime().min(10).max(20)"'
    )
  })

  test('Preset', () => {
    expect(
      parseString(
        {
          type: 'string',
          minLength: 10,
          maxLength: 20,
          pattern: '2022+',
          format: 'date-time',
        },
        {
          ...ctx,
          ...{ parsers: { stringParser: 'format-minmax-regex' } },
        }
      )
    ).toMatchInlineSnapshot(
      '"z.string().datetime().min(10).max(20).regex(new RegExp("2022+"))"'
    )
  })
})
