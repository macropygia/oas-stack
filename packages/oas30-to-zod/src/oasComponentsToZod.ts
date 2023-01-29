import path from 'node:path'
// import { fileURLToPath } from 'node:url'

import ejs from 'ejs'
import fse from 'fs-extra'
import SwaggerParser from '@apidevtools/swagger-parser'
import { red } from 'ansis/colors'

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
  disableFormat: false,
  ...defaultParseOptions,
}

/**
 * Generate Zod schemas from OpenAPI 3.0 Components Object
 * @param input - Document object or file path
 * @param userOptions - Options
 * @returns Zod schemas (JavaScript)
 */
export const oasComponentsToZod = async (
  input: Document | string,
  userOptions?: Options
): Promise<string> => {
  const options: Options = { ...defaultOptions, ...userOptions }

  if (options.output)
    await fse.ensureFile(options.output).catch((err) => {
      console.error(red`Unable to create output file.`)
      throw new Error(err)
    })

  if (options.template && !fse.existsSync(options.template))
    throw new Error(`EJS template does not exists: ${options.template}`)

  const doc: Document =
    typeof input === 'string'
      ? ((await SwaggerParser.bundle(input)) as Document)
      : input

  if (!doc.openapi.startsWith('3.0')) {
    console.error(red`Version mismatch:`, doc.openapi)
    throw new Error('Only version 3.0 is supported.')
  }

  if (!('components' in doc))
    throw new Error(`'document.components' does not exists.`)
  const { components } = doc

  if (!('schemas' in components))
    throw new Error(`'document.componentes.schemas' does not exists.`)
  const { schemas } = components

  if (!options.disableAutocomplete) autocompleteObject(doc)

  const compGraph: ComponentGraph = { deps: {}, isObject: {} }

  const dereferenced = await SwaggerParser.dereference(
    JSON.parse(JSON.stringify(doc))
  ).then((deref) => {
    const resolvedSchemas = (deref as Document).components!.schemas!
    Object.entries(resolvedSchemas).forEach(([compName, compSchema]) => {
      if ('type' in compSchema && compSchema.type === 'object')
        compGraph.isObject[compName] = true
      else compGraph.isObject[compName] = false
    })
    return deref as Document
  })

  const targetDoc = options.dereference ? dereferenced : doc
  const targetSchema = options.dereference
    ? dereferenced.components!.schemas!
    : schemas

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
      schemas: targetSchema,
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

  const ts = ejs.render(template, {
    // Processed data
    parsedComponents,
    printingOrder,
    // Options
    ...options,
    // Graph
    graph: compGraph,
    data,
  })

  const result = options.disableFormat ? ts : format(ts)

  if (options.output) fse.outputFile(options.output, result)

  return result
}
