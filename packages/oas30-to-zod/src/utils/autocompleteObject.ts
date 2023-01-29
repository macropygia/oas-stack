import type { Document, SchemaObject } from '../types/index.js'

/**
 * Add `type: 'object'` to the schema that has only `properties` or `additionalProperties` .
 * @param doc - OpenAPI 3.0 Document with Components Object
 */
export const autocompleteObject = (doc: Document) => {
  if (!doc.components?.schemas) throw new Error('Invalid document.')

  const schemas = doc.components.schemas

  for (const comp of Object.keys(schemas)) {
    if ('$ref' in schemas[comp]!) continue
    if (
      ('properties' in schemas[comp]! ||
        'additionalProperties' in schemas[comp]!) &&
      !('type' in schemas[comp]!)
    )
      (schemas[comp] as SchemaObject).type = 'object'
  }
}
