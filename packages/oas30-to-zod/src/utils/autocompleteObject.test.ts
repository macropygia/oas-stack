import { describe, test, expect } from 'vitest'

import type { Document } from '../types/index.js'

import { autocompleteObject } from './autocompleteObject.js'

const doc: Document = {
  openapi: '',
  info: {
    title: '',
    version: '',
  },
  paths: {},
  components: {
    schemas: {
      Ref: {
        $ref: '',
      },
      Object: {
        type: 'object',
        properties: {},
      },
      OnlyProps: {
        properties: {},
      },
      OnlyAddProps: {
        additionalProperties: false,
      },
    },
  },
}

describe('autocompleteObject', () => {
  test('default', () => {
    autocompleteObject(doc)
    expect(doc).toMatchInlineSnapshot(`
      {
          "components": {
              "schemas": {
                  "Object": {
                      "properties": {},
                      "type": "object",
                  },
                  "OnlyAddProps": {
                      "additionalProperties": false,
                      "type": "object",
                  },
                  "OnlyProps": {
                      "properties": {},
                      "type": "object",
                  },
                  "Ref": {
                      "$ref": "",
                  },
              },
          },
          "info": {
              "title": "",
              "version": "",
          },
          "openapi": "",
          "paths": {},
      }
    `)
  })

  test('invalid', () => {
    /* @ts-ignore */
    expect(() => autocompleteObject({})).toThrowErrorMatchingInlineSnapshot(
      '"Invalid document."'
    ) // eslint-disable-line
  })
})
