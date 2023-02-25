import prettier from 'prettier'
import babelParser from 'prettier/parser-babel.js'

import { green, yellow } from '@/utils/ansi'

/**
 * Format generated code using Prettier.
 * @param source - Raw code
 * @returns Formatted Zod schema (string)
 */
export const formatParsedString = (
  source: string,
  inheritPrettier?: boolean | prettier.Options
): string => {
  const options = inheritPrettier
    ? typeof inheritPrettier === 'object'
      ? inheritPrettier
      : getPrettierOptions() || {}
    : {}

  if (!('parser' in options))
    Object.assign(options, {
      parser: 'babel-ts',
      plugins: [babelParser],
    })

  return prettier.format(source, options)
}

/**
 * Find prettier config and resolve
 * @returns Prettier options
 */
export const getPrettierOptions = (): prettier.Options | null => {
  const configFile = prettier.resolveConfigFile.sync(process.cwd())
  const options = prettier.resolveConfig.sync(process.cwd())

  if (!configFile || !options) {
    console.log(yellow(`Unable to find Prettier config in a project.`))
    return null
  }

  console.log(green(`Resolve Prettier config succeeded:`), configFile)
  console.group()
  console.log(options)
  console.groupEnd()

  return options
}
