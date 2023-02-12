import path from 'node:path'
// import { fileURLToPath } from 'node:url'

import SwaggerParser from '@apidevtools/swagger-parser'
import ejs from 'ejs'
import fse from 'fs-extra'

import { defaultParseOptions, parseSchema } from '@/parseSchema.js'
import { format } from '@/utils/format.js'
import { generateGraph } from '@/utils/generateGraph'
import { generatePrintingOrder } from '@/utils/generatePrintingOrder.js'
import { initDoc } from '@/utils/initDoc'

import type { Document, Options, ComponentName } from '@/types/index.js'
import type { OpenAPIV3 } from 'openapi-types'

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

  const doc = await initDoc(input, options)

  const dereferencedDoc = await SwaggerParser.dereference(
    JSON.parse(JSON.stringify(doc))
  ).then((deref) => deref as Document)

  const graph = generateGraph(dereferencedDoc)

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
      graph,
      name: compName,
      deps,
      doc: targetDoc,
      schemas: targetDoc.components.schemas,
      data,
    })
    graph.deps[compName] = deps
  })

  // Create a shallow copy of deps for destructive processing
  const componentDeps = Object.assign({}, graph.deps)
  const printingOrder = generatePrintingOrder(componentDeps)

  const template = options.template
    ? fse.readFileSync(options.template).toString()
    : fse.readFileSync(path.resolve(__dirname, 'default.ts.ejs')).toString()

  const rawParsed = ejs.render(template, {
    // Processed data
    parsedComponents,
    printingOrder,
    // Options
    ...options,
    // Graph
    graph,
    data,
  })

  const parsed = options.disableFormat
    ? rawParsed
    : format(rawParsed, options.inheritPrettier)

  if (options.output) fse.outputFileSync(options.output, parsed)

  return parsed
}
