import type { MixedObject } from '../../types/index.js'

export const addDesc = (schema: MixedObject, parsed: string): string =>
  'description' in schema && schema.description.length > 0
    ? `${parsed}.describe(${JSON.stringify(schema.description)})`
    : parsed
