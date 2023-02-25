import SwaggerParser from '@apidevtools/swagger-parser'

import { red } from '@/utils/ansi'
import { autocompleteObject } from '@/utils/autocompleteObject'

import type { Options, Document } from '@/types/index.js'
import type { OpenAPI, OpenAPIV3 } from 'openapi-types'

/**
 * Validate document
 * @param input - Document object or file path
 * @param options - Options
 * @returns Document object
 */
export const validateDoc = async (
  input: OpenAPI.Document | string,
  options: Options
) => {
  const doc =
    typeof input === 'string' ? await SwaggerParser.bundle(input) : input

  if (!isV3(doc)) {
    console.error(
      red(`Document version mismatch. Only version 3.0 is supported.`)
    )
    throw new Error('Only version 3.0 is supported.')
  }

  if (!hasComponents(doc)) throw new Error(`Document has no 'components'.`)

  if (!options.disableAutocomplete) autocompleteObject(doc)

  return doc
}

/**
 * Check version
 * @param doc - OpenAPI Document (any versions)
 * @returns boolean
 */
export const isV3 = (doc: OpenAPI.Document): doc is OpenAPIV3.Document =>
  'openapi' in doc && doc.openapi.startsWith('3.0')

/**
 * Check components
 * @param doc - OpenAPI 3.0 Document
 * @returns boolean
 */
export const hasComponents = (doc: OpenAPIV3.Document): doc is Document =>
  'components' in doc && 'schemas' in doc.components
