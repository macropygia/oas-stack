import type { ParseContext } from '@/types/index.js'

export const emptyContext: ParseContext = {
  options: {},
  graph: { deps: {}, isObject: {}, isNullable: {}, hasDefault: {} },
  name: 'TestComponent',
  deps: [],
  data: {},
}

/* @ts-ignore */
export const dummyParser = (schema: any, ctx: any) => 'dummy' // eslint-disable-line

export const minimumOutput = {
  withoutImport: true,
  withoutExport: true,
}
