import { red } from 'ansis/colors'

import type { ReferenceParser } from '../types/index.js'

import { getComponentNameFromRef } from './utils/getComponentNameFromRef.js'

export const parseReference: ReferenceParser = (schema, ctx) => {
  if (typeof ctx.parsers?.referenceParser === 'function')
    return ctx.parsers.referenceParser(schema, ctx)

  const comp = getComponentNameFromRef(schema.$ref)
  if (comp) {
    if (ctx.deps) ctx.deps.push(comp)
    return comp
  }

  console.error(
    ctx.name,
    red`'$ref' references an unknown object. (maybe external)`
  )
  throw new Error(`'$ref' references an unknown object.`)

  // return 'z.undefined()'
}
