import type { Document, ComponentGraph } from '@/types/index.js'

/**
 * Generate component graph from dereferenced document
 * @param dereferencedDoc - Dereferenced document
 * @returns Component graph object
 */
export const generateGraph = (dereferencedDoc: Document): ComponentGraph => {
  const compGraph: ComponentGraph = {
    deps: {},
    isObject: {},
    isNullable: {},
    hasDefault: {},
  }

  const resolvedSchemas = (dereferencedDoc as Document).components.schemas

  Object.entries(resolvedSchemas).forEach(([compName, compSchema]) => {
    // Object
    if ('type' in compSchema && compSchema.type === 'object')
      compGraph.isObject[compName] = true
    else compGraph.isObject[compName] = false

    // Nullable
    if ('nullable' in compSchema && compSchema.nullable === true)
      compGraph.isNullable[compName] = true
    else compGraph.isNullable[compName] = false

    // Default
    if ('default' in compSchema) compGraph.hasDefault[compName] = true
    else compGraph.hasDefault[compName] = false
  })

  return compGraph
}
