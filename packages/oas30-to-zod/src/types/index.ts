import type prettier from 'prettier'
import type { OpenAPIV3 } from 'openapi-types'

type Modify<T, R> = Omit<T, keyof R> & R

// ---------------------------------------------------------
// Document

export interface Document extends OpenAPIV3.Document {
  components: ComponentsObject
}

// ---------------------------------------------------------
// Components

export interface ComponentsObject extends OpenAPIV3.ComponentsObject {
  schemas: MixedRecord
}

// ---------------------------------------------------------
// Schema Objects

export type NonArraySchemaObject = OpenAPIV3.NonArraySchemaObject
export type ArraySchemaObject = OpenAPIV3.ArraySchemaObject
export type SchemaObject = OpenAPIV3.SchemaObject
export type ReferenceObject = OpenAPIV3.ReferenceObject
export type MixedObject = SchemaObject | ReferenceObject

export type MixedRecord = Record<string, MixedObject>

// ---------------------------------------------------------
// Schema Type
// - Based on `@types/json-schema`

export type SchemaTypeName =
  | OpenAPIV3.ArraySchemaObjectType
  | OpenAPIV3.NonArraySchemaObjectType

export type SchemaType =
  | string
  | number
  | boolean
  | SchemaTypeArray
  | SchemaTypeObject

export interface SchemaTypeArray extends Array<SchemaType> {}

export interface SchemaTypeObject extends Record<string, SchemaType> {}

// ---------------------------------------------------------
// Parser

// template
export type SchemaParser<T extends string, U> = (
  schema: SchemaObject & { [key in T]: U },
  ctx: ParseContext
) => string

// primitives
export type StringParser = SchemaParser<'type', 'string'>
export type NumberParser = SchemaParser<'type', 'number' | 'integer'>
export type BooleanParser = SchemaParser<'type', 'boolean'>

// object, array, enum
export type ObjectParser = SchemaParser<'type', 'object'>
export type ArrayParser = SchemaParser<'type', 'array'>
export type EnumParser = SchemaParser<'enum', SchemaType[]>

// allOf, anyOf, oneOf, not
export type AnyOfParser = SchemaParser<'anyOf', MixedObject[]>
export type AllOfParser = SchemaParser<'allOf', MixedObject[]>
export type OneOfParser = SchemaParser<'oneOf', MixedObject[]>
export type NotParser = SchemaParser<'not', MixedObject>

// $ref
export type ReferenceParser = (
  schema: ReferenceObject & { $ref: string },
  ctx: ParseContext
) => string

// `nullable: true` (3.0 only)
export type NullableParser = SchemaParser<'nullable', true>

// default (fallback)
export type DefaultParser = (schema: SchemaObject, ctx: ParseContext) => string

// Preset

export type StringPreset =
  | 'minmax-regex-format'
  | 'minmax-format-regex'
  | 'regex-format-minmax'
  | 'regex-minmax-format'
  | 'format-minmax-regex'
  | 'format-regex-minmax'

// Parsers and presets
export interface SchemaParsers {
  referenceParser?: ReferenceParser
  nullableParser?: NullableParser
  objectParser?: ObjectParser
  arrayParser?: ArrayParser
  anyOfParser?: AnyOfParser
  allOfParser?: AllOfParser
  oneOfParser?: OneOfParser
  notParser?: NotParser
  enumParser?: EnumParser
  stringParser?: StringParser | StringPreset
  numberParser?: NumberParser
  booleanParser?: BooleanParser
  defaultParser?: DefaultParser
}

// ---------------------------------------------------------
// Parser Context

export type ComponentName = string

export type ComponentDeps = Record<ComponentName, ComponentName[]>

export type ComponentIsObject = Record<ComponentName, boolean>

export interface ComponentGraph {
  deps: ComponentDeps
  isObject: ComponentIsObject
}

export interface ParseContext {
  options: ParseOptions
  parsers?: SchemaParsers | undefined
  graph?: ComponentGraph
  name?: ComponentName
  deps?: ComponentName[]
  doc?: Document
  schemas?: MixedRecord
  data?: Record<string, any>
}

// ---------------------------------------------------------
// Options

// Output and EJS options
export interface Options extends ParseOptions {
  output?: string | false // CLI
  dereference?: boolean // CLI
  disableAutocomplete?: boolean // CLI
  exportName?: string // CLI
  individually?: boolean // CLI
  eslintDisable?: boolean // CLI
  disableRules?: string[] // CLI
  withoutImport?: boolean // CLI
  withoutExport?: boolean // CLI
  inheritPrettier?: boolean | prettier.Options // CLI
  disableFormat?: boolean // CLI
  template?: string // CLI
}

// Parser options
export interface ParseOptions {
  withoutDefaults?: boolean | undefined // CLI
  withDesc?: boolean | undefined // CLI
  withAnchors?: boolean | undefined // CLI
  parsers?: SchemaParsers | undefined
}

// CLI options
export type CliOptions = Modify<
  Omit<Options, 'parsers'>,
  {
    output?: string
    disableRules?: string
    inheritPrettier?: boolean
  }
>
