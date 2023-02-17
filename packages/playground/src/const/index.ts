import type { Options } from '../types'

export const defaultPrettier = `{
  "printWidth": 60
}
`

export const defaultOptions: Options = {
  dereference: false,
  exportName: undefined,
  individually: false,
  eslintDisable: false,
  disableRules: undefined,
  withoutImport: false,
  withoutExport: false,
  disableFormat: false,
  withoutDefaults: false,
  withDesc: false,
  withAnchors: false,
  disableAutocomplete: false,
  fontSize: 14,
  inheritPrettier: defaultPrettier,
  splitRatio: 50,
}

export const defaultDoc = `openapi: 3.0.0
info:
  version: 1.0.0
  title: sample
paths:
components:
  schemas:
    Comp1:
      type: string
      minLength: 3
      maxLength: 10
      pattern: '[a-z]+'
      default: foo
      description: bar
    Comp2:
      type: boolean
    Comp3:
      type: integer
    Comp4:
      type: string
      enum:
        - foo
        - bar
      default:
        - foo
    Comp5:
      type: object
      required:
        - Prop1
        - Prop5
      properties:
        Prop1:
          $ref: '#/components/schemas/Comp1'
        Prop2:
          $ref: '#/components/schemas/Comp2'
        Prop3:
          $ref: '#/components/schemas/Comp3'
        Prop4:
          $ref: '#/components/schemas/Comp4'
        Prop5:
          type: number
          minimum: 100
          exclusiveMinimum: true
`
