import type { Document, Options, ParseContext } from '@/types/index.js'

/**
 * Empty context
 */
export const emptyContext: ParseContext = {
  options: {},
  graph: { deps: {}, isObject: {}, isNullable: {}, hasDefault: {} },
  name: 'TestComponent',
  deps: [],
  data: {},
}

/**
 * Dummy parser
 * @param schema - OAS Schema
 * @param ctx - Context
 * @returns 'dummy'
 */
/* @ts-ignore */
export const dummyParser = (schema: any, ctx: any) => 'dummy' // eslint-disable-line

/**
 * Options object for minimizing output.
 */
export const minimizeOutput: Options = {
  withoutImport: true,
  withoutExport: true,
}

/**
 * Minimum document object
 */
export const minimumDocument: Document = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Untitled',
  },
  paths: {},
  components: {
    schemas: {},
  },
}
