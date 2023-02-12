import SwaggerParser from '@apidevtools/swagger-parser'
import { red } from 'ansis/colors'
import fse from 'fs-extra'

import { autocompleteObject } from '@/utils/autocompleteObject'
import { isV3, isValidDoc } from '@/utils/validateDoc'

import type { Options } from '@/types/index.js'
import type { OpenAPI } from 'openapi-types'

/**
 * Verify settings and document
 * @param input - Document object or file path
 * @param options - Options
 * @returns Document object
 */
export const initDoc = async (
  input: OpenAPI.Document | string,
  options: Options
) => {
  if (options.output)
    await fse.ensureFile(options.output).catch((err) => {
      console.error(red`Unable to create output file.`)
      throw new Error(err)
    })

  if (options.template && !fse.existsSync(options.template))
    throw new Error(`EJS template does not exists: ${options.template}`)

  const doc =
    typeof input === 'string' ? await SwaggerParser.bundle(input) : input

  if (!isV3(doc)) {
    console.error(
      red`Document version mismatch. Only version 3.0 is supported.`
    )
    throw new Error('Only version 3.0 is supported.')
  }

  if (!isValidDoc(doc))
    throw new Error(`Document has no 'components' or 'schemas'.`)

  if (!options.disableAutocomplete) autocompleteObject(doc)

  return doc
}
