import { yellow } from '@/utils/ansi'

import type { NumberParser } from '@/types/index.js'

export const parseNumber: NumberParser = (schema, ctx) => {
  if (typeof ctx.parsers?.numberParser === 'function')
    return ctx.parsers.numberParser(schema, ctx)

  const fragments = ['z.number()']

  if (
    schema.type === 'integer' ||
    schema.format === 'int32' ||
    schema.format === 'int64' ||
    schema.multipleOf === 1
  )
    fragments.push('.int()')

  if (typeof schema.multipleOf === 'number' && schema.multipleOf !== 1) {
    if (schema.multipleOf < 0)
      console.log(ctx.name, yellow(`'multipleOf' is negative.`))
    if (schema.multipleOf % 1 !== 0)
      console.log(ctx.name, yellow(`'multipleOf' is float.`))
    fragments.push(`.multipleOf(${schema.multipleOf})`)
  }

  if (typeof schema.minimum === 'number')
    fragments.push(
      schema.exclusiveMinimum === true
        ? `.gt(${schema.minimum})`
        : `.gte(${schema.minimum})`
    )

  if (typeof schema.maximum === 'number') {
    fragments.push(
      schema.exclusiveMaximum === true
        ? `.lt(${schema.maximum})`
        : `.lte(${schema.maximum})`
    )

    if (typeof schema.minimum === 'number' && schema.minimum > schema.maximum)
      console.log(ctx.name, yellow(`'minimum' greater than 'maxiumum'`))
  }

  return fragments.join('')
}
