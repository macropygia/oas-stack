import path from 'node:path'
// import { fileURLToPath } from 'node:url'

import ejs from 'ejs'
import fse from 'fs-extra'
import SwaggerParser from '@apidevtools/swagger-parser'
import { red } from 'ansis/colors'
import type { OpenAPI, OpenAPIV3 } from 'openapi-types'

import { defaultParseOptions, parseSchema } from './parseSchema.js'
import type {
  Document,
  ComponentGraph,
  Options,
  ComponentName,
} from './types/index.js'
import { format } from './utils/format.js'
import { generatePrintingOrder } from './utils/generatePrintingOrder.js'
import { autocompleteObject } from './utils/autocompleteObject.js'
import { isV3, isValidDoc } from './utils/validateDoc.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const defaultOptions: Options = {
  output: false,
  dereference: false,
  disableAutocomplete: false,
  exportName: 'schemas',
  individually: false,
  eslintDisable: false,
  disableRules: [],
  withoutImport: false,
  withoutExport: false,
  inheritPrettier: false,
  disableFormat: false,
  ...defaultParseOptions,
}

const init = async (input: OpenAPI.Document | string, options: Options) => {
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

  return doc
}

/**
 * Generate Zod schemas from OpenAPI 3.0 Components Object
 * @param input - Document object or file path
 * @param userOptions - Options
 * @returns Zod schemas (JavaScript)
 */
export const oasComponentsToZod = async (
  input: OpenAPIV3.Document | string,
  userOptions?: Options
): Promise<string> => {
  const options: Options = { ...defaultOptions, ...userOptions }

  const doc = await init(input, options)

  if (!options.disableAutocomplete) autocompleteObject(doc)

  const compGraph: ComponentGraph = { deps: {}, isObject: {} }

  const dereferencedDoc = await SwaggerParser.dereference(
    JSON.parse(JSON.stringify(doc))
  ).then((deref) => {
    const resolvedSchemas = (deref as Document).components.schemas
    Object.entries(resolvedSchemas).forEach(([compName, compSchema]) => {
      if ('type' in compSchema && compSchema.type === 'object')
        compGraph.isObject[compName] = true
      else compGraph.isObject[compName] = false
    })
    return deref as Document
  })

  const targetDoc = options.dereference ? dereferencedDoc : doc
  const targetSchema = targetDoc.components.schemas

  // Reserved object for cusomization
  const data: Record<string, any> = {}

  const parsedComponents: Record<ComponentName, string> = {}
  Object.entries(targetSchema).forEach(([compName, compSchema]) => {
    const deps: ComponentName[] = []
    parsedComponents[compName] = parseSchema(compSchema, {
      options,
      parsers: options.parsers,
      graph: compGraph,
      name: compName,
      deps,
      doc: targetDoc,
      schemas: targetDoc.components.schemas,
      data,
    })
    compGraph.deps[compName] = deps
  })

  // Create a shallow copy of deps for destructive processing
  const componentDeps = Object.assign({}, compGraph.deps)
  const printingOrder = generatePrintingOrder(componentDeps)

  const template = options.template
    ? fse.readFileSync(options.template).toString()
    : fse.readFileSync(path.resolve(__dirname, 'default.ts.ejs')).toString()

  const raw = ejs.render(template, {
    // Processed data
    parsedComponents,
    printingOrder,
    // Options
    ...options,
    // Graph
    graph: compGraph,
    data,
  })

  const parsed = options.disableFormat
    ? raw
    : format(raw, options.inheritPrettier)

  if (options.output) fse.outputFile(options.output, parsed)

  return parsed
}
