import { red, yellow } from 'ansis/colors'

import type { AllOfParser, MixedObject, ParseContext } from '../types/index.js'
import { half } from '../utils/half.js'
import { parseSchema } from '../parseSchema.js'

import { getComponentNameFromRef } from './utils/getComponentNameFromRef.js'

export const parseAllOf: AllOfParser = (schema, ctx) => {
  if (typeof ctx.parsers?.allOfParser === 'function')
    return ctx.parsers.allOfParser(schema, ctx)

  // 'allOf' is empty or not an array
  if (!Array.isArray(schema.allOf) || schema.allOf.length === 0) {
    console.error(ctx.name, red`'allOf' is empty or not an array.`)
    return 'z.undefined()'
  }

  // 'allOf' has only one element
  if (schema.allOf.length === 1) {
    return parseSchema(schema.allOf[0]!, ctx)
  }

  // 'allOf' has multiple objects
  if (doesAllOfContainOnlyObject(schema.allOf, ctx)) {
    return schema.allOf
      .map((schema, index) => {
        if (index === 0) return parseSchema(schema, ctx)
        return `.merge(${parseSchema(schema, ctx)})`
      })
      .join('')
  }

  // 'allOf' has multiple elements including a non-object.
  console.log(
    ctx.name,
    yellow`'allOf' has non-object schema. It may cause malfunction.`
  )
  const [left, right] = half(schema.allOf as MixedObject[])
  return `z.intersection(${parseAllOf({ allOf: left }, ctx)},${parseAllOf(
    {
      allOf: right,
    },
    ctx
  )})`
}

/**
 * Check if all the schemas that allOf has are objects.
 * @param schemaList - Array of schemas
 * @param ctx - Context
 * @returns boolean
 */
const doesAllOfContainOnlyObject = (
  schemaList: MixedObject[],
  ctx: ParseContext
) =>
  schemaList.filter((element) => {
    if ('type' in element && element.type === 'object') return false
    if ('$ref' in element) {
      const compName = getComponentNameFromRef(element.$ref)
      if (!compName) {
        console.error(
          ctx.name,
          red`'$ref' references an unknown object. (maybe external)`
        )
        throw new Error(`'$ref' references an unknown object.`)
      }
      if (ctx.graph?.isObject[compName] === true) return false
    }
    return true
  }).length === 0
