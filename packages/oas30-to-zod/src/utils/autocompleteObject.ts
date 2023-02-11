import type { Document } from '@/types/index.js'

/**
 * Add `type: 'object'` to the schema that has only `properties` or `additionalProperties` .
 * @param doc - OpenAPI 3.0 Document with Components Object
 */
export const autocompleteObject = (doc: Document) => {
  if (!doc.components?.schemas) throw new Error('Invalid document.')

  const schemas = doc.components.schemas

  Object.values(schemas).forEach((schema) => {
    if (
      !('$ref' in schema) &&
      ('properties' in schema || 'additionalProperties' in schema) &&
      !('type' in schema)
    )
      schema.type = 'object'
  })
}
