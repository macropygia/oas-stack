#!/usr/bin/env node
import path from 'node:path'

import cac from 'cac' // eslint-disable-line import/no-named-as-default

import { oasComponentsToZod } from '@/oasComponentsToZod.js'
import { cyan, green } from '@/utils/ansi'

import type { CliOptions } from '@/types/index.js'

const cli = cac('oas30-to-zod')

// prettier-ignore
cli
  .command('<input>', 'Path/URL to JSON/YAML compatible with OpenAPI Specification 3.0')
  .option('-o, --output <path>', 'Output path for the ts file (default: `<input>.ts`)')
  .option('--dereference', 'Use dereferred document')
  .option('-n, --export-name <name>', 'Set variable name for export (default: `schemas`)')
  .option('-i, --individually', 'Export individually (e.g. `export const Component = z.any()`)')
  .option('-e, --eslint-disable', 'Add `/* eslint-disable */` to first line')
  .option('-r, --disable-rules <rules>', 'Comma-separated rules to disable (e.g. `no-control-regex`)')
  .option('--without-import', "Disable to output `import { z } from 'zod'`")
  .option('--without-export', "Disable to output `export const schemas = { ... }`")
  .option('--disable-format', 'Disable Prettier')
  .option('-p, --inherit-prettier', 'Inherit Prettier settings from the project')
  .option('--without-defaults', 'Disable convert `schema.default` to `.default()`')
  .option('-d, --with-desc', 'Enable convert `schema.description` to `.descrive()`')
  .option('-a, --with-anchors', 'Wrap regex with `^` and `$`')
  .option('--disable-autocomplete', "Disable autocomplete `type: 'object'`")
  .option('-t, --template <path>', 'Template path for EJS')
  .action(async (input: string, options: CliOptions) => {
    console.log('oas30-to-zod', green(`Start processing...`))

    const output: string =
      options.output ||
      path.format({...path.parse(input), ...{ ext: '.ts', base: undefined }})

    const disableRules: string[] = options.disableRules
      ? options.disableRules.split(',').map((rule) => rule.trim())
      : []

    await oasComponentsToZod(input, { ...options, output, disableRules })

    console.log('oas30-to-zod', cyan(`Output path:`), output)
    console.log('oas30-to-zod', green(`Done`))
  })

cli.help()

cli.parse()
