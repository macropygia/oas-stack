import type { ParseContext } from '@/types/index.js'

export const minimumContext: ParseContext = {
  options: {},
  graph: { deps: {}, isObject: {}, isNullable: {}, hasDefault: {} },
  name: 'Component',
  deps: [],
  data: {},
}
