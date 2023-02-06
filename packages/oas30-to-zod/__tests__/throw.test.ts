import { describe, test, expect } from 'vitest'

import { oasComponentsToZod } from '../src/oasComponentsToZod.js'

describe('oasComponentsToZod (rejects)', () => {
  test('Invalid output', async () => {
    await expect(() =>
      oasComponentsToZod('__tests__/minimum.yml', {
        output: '/dev/null/minimum.ts',
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Error: ENOTDIR: not a directory, scandir \'/dev/null\'"'
    )
  })

  test('Version mismatch', async () => {
    await expect(() =>
      oasComponentsToZod({
        openapi: '3.1.0',
        info: {
          title: '',
          version: '',
        },
        paths: {},
        components: {
          schemas: {},
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Only version 3.0 is supported."'
    )
  })

  test('Document has no components', async () => {
    await expect(() =>
      oasComponentsToZod({
        openapi: '3.0.0',
        info: {
          title: '',
          version: '',
        },
        paths: {},
        // components: {
        //   schemas: {},
        // },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      "\"Document has no 'components' or 'schemas'.\""
    )
  })

  test('Components has no schemas', async () => {
    await expect(() =>
      oasComponentsToZod({
        openapi: '3.0.0',
        info: {
          title: '',
          version: '',
        },
        paths: {},
        components: {
          // schemas: {},
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      "\"Document has no 'components' or 'schemas'.\""
    )
  })

  test('External template does not exists', async () => {
    await expect(() =>
      oasComponentsToZod('__tests__/basic.yml', {
        template: 'nothing.ts.ejs',
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"EJS template does not exists: nothing.ts.ejs"'
    )
  })
})
