import type { MixedObject } from '../../types/index.js'

/**
 * Add `.default()` to Zod schema when needed
 * @param schema - OAS Schema
 * @param parsed - Zod Schema (string)
 * @returns Zod schema (string)
 */
export const addDefault = (schema: MixedObject, parsed: string): string => {
  // TODO: Refactor
  // Skip if it already has `.default()`
  if ('default' in schema && !parsed.includes('.default'))
    return `${parsed}.default(${JSON.stringify(schema.default)})`
  return parsed
}
