import fse from 'fs-extra'
import { describe, test, expect } from 'vitest'

import { oasComponentsToZod } from '../src/oasComponentsToZod.js'

const minimumOutput = {
  withoutImport: true,
  withoutExport: true,
}

describe('oasComponentsToZod (basic)', async () => {
  test('Default', async () => {
    await expect(
      oasComponentsToZod('__tests__/basic.yml')
    ).resolves.toMatchSnapshot()
  })

  test('Disable format', async () => {
    await expect(
      oasComponentsToZod('__tests__/basic.yml', {
        disableFormat: true,
      })
    ).resolves.toMatchSnapshot()
  })

  test('Enable output', async () => {
    await oasComponentsToZod('__tests__/minimum.yml', {
      ...minimumOutput,
      output: '__tests__/minimum.ts',
    })

    expect(fse.readFileSync('__tests__/minimum.ts').toString())
      .toMatchInlineSnapshot(`
      "const Minimum = z.string();
      "
    `)

    fse.removeSync('__tests__/minimum.ts')
  })

  test('Enable dereference', async () => {
    await expect(
      oasComponentsToZod('__tests__/dereference.yml', {
        ...minimumOutput,
        dereference: true,
      })
    ).resolves.toMatchSnapshot()
  })

  test('Change export variable name', async () => {
    await expect(
      oasComponentsToZod('__tests__/minimum.yml', {
        withoutImport: true,
        exportName: 'foo',
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Minimum = z.string();

      export const foo = {
        Minimum,
      };
      "
    `)
  })

  test('Export individually', async () => {
    await expect(
      oasComponentsToZod('__tests__/minimum.yml', {
        ...minimumOutput,
        individually: true,
      })
    ).resolves.toMatchInlineSnapshot(`
      "export const Minimum = z.string();
      "
    `)
  })

  test('Add `eslint-disable`', async () => {
    await expect(
      oasComponentsToZod('__tests__/minimum.yml', {
        ...minimumOutput,
        eslintDisable: true,
      })
    ).resolves.toMatchInlineSnapshot(`
      "/* eslint-disable */

      const Minimum = z.string();
      "
    `)
  })

  test('Add `eslint-disable` with single rule', async () => {
    await expect(
      oasComponentsToZod('__tests__/minimum.yml', {
        ...minimumOutput,
        eslintDisable: true,
        disableRules: ['no-control-regex'],
      })
    ).resolves.toMatchInlineSnapshot(`
      "/* eslint-disable no-control-regex */

      const Minimum = z.string();
      "
    `)
  })

  test('Add `eslint-disable` with multiple rules', async () => {
    await expect(
      oasComponentsToZod('__tests__/minimum.yml', {
        ...minimumOutput,
        eslintDisable: true,
        disableRules: ['no-control-regex', 'import/no-named-export'],
      })
    ).resolves.toMatchInlineSnapshot(`
      "/* eslint-disable no-control-regex, import/no-named-export */

      const Minimum = z.string();
      "
    `)
  })

  test('Disable `.default()`', async () => {
    await expect(
      oasComponentsToZod('__tests__/string.yml', {
        ...minimumOutput,
        withoutDefaults: true,
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Minimum = z.string().min(1).max(10).regex(new RegExp("[a-z]+"));
      "
    `)
  })

  test('Enable `.descrive()`', async () => {
    await expect(
      oasComponentsToZod('__tests__/string.yml', {
        ...minimumOutput,
        withDesc: true,
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Minimum = z
        .string()
        .min(1)
        .max(10)
        .regex(new RegExp("[a-z]+"))
        .describe("bar")
        .default("foo");
      "
    `)
  })

  test('Wrap regex with anchors', async () => {
    await expect(
      oasComponentsToZod('__tests__/string.yml', {
        ...minimumOutput,
        withAnchors: true,
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Minimum = z
        .string()
        .min(1)
        .max(10)
        .regex(new RegExp("^[a-z]+$"))
        .default("foo");
      "
    `)
  })

  test('Use preset', async () => {
    await expect(
      oasComponentsToZod('__tests__/string.yml', {
        ...minimumOutput,
        parsers: {
          stringParser: 'format-regex-minmax',
        },
      })
    ).resolves.toMatchInlineSnapshot(`
      "const Minimum = z
        .string()
        .regex(new RegExp("[a-z]+"))
        .min(1)
        .max(10)
        .default("foo");
      "
    `)
  })

  test('Use external template', async () => {
    await expect(
      oasComponentsToZod('__tests__/string.yml', {
        disableFormat: true,
        template: '__tests__/test.ts.ejs',
      })
    ).resolves.toMatchInlineSnapshot('"External Template"')
  })
})
