import { describe, test, expect } from 'vitest'

import { autocompleteObject } from '@/utils/autocompleteObject.js'

import type { Document } from '@/types/index.js'

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
  test('Valid', () => {
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

  test('Invalid', () => {
    /* @ts-ignore */
    expect(() => autocompleteObject({})).toThrowErrorMatchingInlineSnapshot(
      '"Invalid document."'
    ) // eslint-disable-line
  })
})
