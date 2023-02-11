import { describe, test, expect } from 'vitest'

import { minimumContext as ctx } from '../__tests__/const.js'

import { parseSchema } from '@/parseSchema.js'

ctx.options = {
  withDesc: true,
}

describe('parseSchema', () => {
  test('Default', () => {
    expect(
      parseSchema(
        { type: 'string', description: 'description', default: 'default' },
        ctx
      )
    ).toMatchInlineSnapshot(
      '"z.string().describe("description").default("default")"'
    )
  })

  test('Non-object', () => {
    /* @ts-ignore */
    expect(parseSchema('', ctx)).toMatchInlineSnapshot('"z.unknown()"')
  })
})
