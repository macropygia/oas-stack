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

  test('Version Mismatch', async () => {
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

  test('Components does not exists', async () => {
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
      '"\'document.components\' does not exists."'
    )
  })

  test('Schemas does not exists', async () => {
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
      '"\'document.componentes.schemas\' does not exists."'
    )
  })

  test('Template does not exists', async () => {
    await expect(() =>
      oasComponentsToZod('__tests__/basic.yml', {
        template: 'nothing.ts.ejs',
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"EJS template does not exists: nothing.ts.ejs"'
    )
  })
})
