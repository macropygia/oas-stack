import stripAnsi from 'strip-ansi'
import YAML from 'yaml'

import { oasComponentsToZod } from '../../../dist/index.js'

import type { FastifyPluginCallback } from 'fastify'

type RequestBody = {
  doc: string
  options: any
  prettier: any
}

export const converter: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.post('/z', async (req) => {
    const body = req.body as RequestBody
    const docStr = body.doc
    const options = body.options
    const prettier = body.prettier

    if (options.disableRules)
      options.disableRules = options.disableRules
        .split(',')
        .map((rule: string) => rule.trim())

    if (options.inheritPrettier) options.inheritPrettier = prettier

    const doc = docStr.startsWith('{') ? JSON.parse(docStr) : YAML.parse(docStr)

    if (!doc) return ''

    try {
      const parsed = await oasComponentsToZod(doc, options)
      return JSON.stringify(parsed)
    } catch (error) {
      if (error instanceof Error)
        return JSON.stringify(stripAnsi(error.message))
      return 'Unknown error'
    }
  })

  done()
}
