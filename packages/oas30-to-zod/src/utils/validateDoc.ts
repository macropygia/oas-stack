import type { OpenAPI, OpenAPIV3 } from 'openapi-types'

import type { Document, ComponentsObject } from '@/types/index.js'

/**
 * Is the document version 3.0?
 * @param doc - OpenAPI Document (any versions)
 * @returns boolean
 */
export const isV3 = (doc: OpenAPI.Document): doc is OpenAPIV3.Document =>
  'openapi' in doc && doc.openapi.startsWith('3.0')

/**
 * Does the document have components?
 * @param doc - OpenAPI 3.0 Document
 * @returns boolean
 */
export const hasComponents = (
  doc: OpenAPIV3.Document
): doc is OpenAPIV3.Document & { components: OpenAPIV3.ComponentsObject } =>
  'components' in doc

/**
 * Does the components object have schemas?
 * @param doc - Components Object in OpenAPI 3.0 Document
 * @returns boolean
 */
export const hasSchemas = (
  components: OpenAPIV3.ComponentsObject
): components is ComponentsObject => 'schemas' in components

/**
 * Document suitable for processing?
 * @param doc - Components Object in OpenAPI 3.0 Document
 * @returns boolean
 */
export const isValidDoc = (doc: OpenAPIV3.Document): doc is Document =>
  hasComponents(doc) && hasSchemas(doc.components)
