import cors from '@fastify/cors'
import * as dotenv from 'dotenv'
import Fastify from 'fastify'
import stripAnsi from 'strip-ansi'
import YAML from 'yaml'

import { oasComponentsToZod } from '../dist/index.mjs'

dotenv.config()

const fastify = Fastify({ logger: true })

await fastify.register(cors, {
  origin: '*',
})

fastify.post('/z', async (req) => {
  const body = req.body
  const docStr = body.doc
  const options = body.options
  const prettier = body.prettier

  if (options.disableRules)
    options.disableRules = options.disableRules.split(',').map((x) => x.trim())

  if (options.inheritPrettier) options.inheritPrettier = prettier

  const doc = docStr.startsWith('{') ? JSON.parse(docStr) : YAML.parse(docStr)

  if (!doc) return ''

  try {
    const parsed = await oasComponentsToZod(doc, options)
    return JSON.stringify(parsed)
  } catch (error) {
    return JSON.stringify(stripAnsi(error.message))
  }
})

const port = process.env.VITE_API_PORT ? process.env.VITE_API_PORT : 8080

fastify.listen({ port })
