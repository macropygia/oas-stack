import type { MixedObject } from '@/types/index.js'

/**
 * Add `.describe()` to Zod schema when needed
 * @param schema - OAS schema
 * @param parsed - Zod schema (string)
 * @returns Zod schema (string)
 */
export const addDesc = (schema: MixedObject, parsed: string): string =>
  'description' in schema && schema.description.length > 0
    ? `${parsed}.describe(${JSON.stringify(schema.description)})`
    : parsed
