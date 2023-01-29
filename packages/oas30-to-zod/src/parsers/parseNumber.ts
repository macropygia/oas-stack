import type { NumberParser } from '../types/index.js'

export const parseNumber: NumberParser = (schema, ctx) => {
  if (typeof ctx.parsers?.numberParser === 'function')
    return ctx.parsers.numberParser(schema, ctx)

  const fragments = ['z.number()']

  if (
    schema.format === 'int64' ||
    schema.multipleOf === 1 ||
    schema.type === 'integer'
  )
    fragments.push('.int()')

  if (typeof schema.multipleOf === 'number' && schema.multipleOf !== 1)
    fragments.push(`.multipleOf(${schema.multipleOf})`)

  if (typeof schema.minimum === 'number')
    fragments.push(
      schema.exclusiveMinimum === true
        ? `.gt(${schema.minimum})`
        : `.gte(${schema.minimum})`
    )

  if (typeof schema.maximum === 'number')
    fragments.push(
      schema.exclusiveMaximum === true
        ? `.lt(${schema.maximum})`
        : `.lte(${schema.maximum})`
    )

  return fragments.join('')
}
