import type {
  ParseContext,
  SchemaObject,
  StringParser,
} from '../types/index.js'
import { escapeControlCharacters } from '../utils/escapeControlCharacters.js'

type ParserType = 'minmax' | 'regex' | 'format'

export const parseString: StringParser = (schema, ctx) => {
  if (typeof ctx.parsers?.stringParser === 'function')
    return ctx.parsers.stringParser(schema, ctx)

  const fragments = ['z.string()']

  const preset = ctx.parsers?.stringParser
    ? ctx.parsers.stringParser
    : 'minmax-regex-format'

  preset
    .split('-')
    .forEach((type) => stringParser[type as ParserType](schema, ctx, fragments))

  return fragments.join('')
}

const stringParser = {
  minmax: (
    schema: SchemaObject & { type: 'string' },
    _ctx: ParseContext,
    fragments: string[]
  ) => {
    if (typeof schema.minLength === 'number')
      fragments.push(`.min(${schema.minLength})`)
    if (typeof schema.maxLength === 'number')
      fragments.push(`.max(${schema.maxLength})`)
  },
  regex: (
    schema: SchemaObject & { type: 'string' },
    ctx: ParseContext,
    fragments: string[]
  ) => {
    if (!schema.pattern) return
    const pattern = escapeControlCharacters(schema.pattern)
    if (ctx.options.withAnchors)
      fragments.push(`.regex(new RegExp(${JSON.stringify(`^${pattern}$`)}))`)
    else fragments.push(`.regex(new RegExp(${JSON.stringify(pattern)}))`)
    // else fragments.push(`.regex(new RegExp("${pattern}"))`)
  },
  format: (
    schema: SchemaObject & { type: 'string' },
    _ctx: ParseContext,
    fragments: string[]
  ) => {
    if (schema.format === 'email') fragments.push('.email()')
    else if (schema.format === 'uri') fragments.push('.url()')
    else if (schema.format === 'uuid') fragments.push('.uuid()')
  },
}
