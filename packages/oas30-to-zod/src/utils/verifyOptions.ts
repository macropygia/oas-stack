import fse from 'fs-extra'

import { red } from '@/utils/ansi'

import type { Options } from '@/types/index.js'

/**
 * Verify options
 * @param options - Options
 */
export const verifyOptions = async (options: Options) => {
  if (options.output)
    await fse.ensureFile(options.output).catch((err) => {
      console.error(red(`Unable to create output file.`))
      throw new Error(err)
    })

  if (options.template && !fse.existsSync(options.template))
    throw new Error(`EJS template does not exists: ${options.template}`)
}
