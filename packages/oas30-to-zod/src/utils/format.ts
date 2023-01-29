// import { green, yellow } from 'ansis/colors'
// import fse from 'fs-extra'
import prettier from 'prettier'
import babelParser from 'prettier/parser-babel.js'

/**
 * Format generated code using Prettier.
 * @param source - Raw code
 * @returns Formatted code
 */
export const format = (source: string): string =>
  prettier.format(source, {
    parser: 'babel',
    plugins: [babelParser],
  })

/*
const getPrettierOptions = async (
  configPath?: string
): Promise<prettier.Options | null> => {
  const configFile =
    configPath && fse.existsSync(configPath)
      ? configPath
      : await prettier.resolveConfigFile().then((configFile) => configFile)

  if (!configFile) {
    console.log(yellow`Unable to find Prettier config file.`)
    return null
  }

  const options = await prettier
    .resolveConfig(configFile)
    .then((options) => options)

  if (!options) {
    console.log(yellow`Unable to resolve Prettier config file.`)
    return null
  }

  console.log(green`Resolve Prettier config succeeded:`, configFile)
  return options
}
*/
