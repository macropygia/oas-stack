import type { MixedObject } from '../../types/index.js'

export const addDefault = (schema: MixedObject, parsed: string): string =>
  'default' in schema
    ? `${parsed}.default(${JSON.stringify(schema.default)})`
    : parsed
