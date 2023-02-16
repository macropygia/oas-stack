import { join, dirname } from 'node:path'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FastifyVite from '@fastify/vite'
import * as dotenv from 'dotenv'
import Fastify from 'fastify'

import { converter } from './converter.js'

import type { FastifyReply, FastifyInstance } from 'fastify'

dotenv.config()

const isDev = process.argv.includes('--dev') ? true : false

export async function main() {
  const fastify = Fastify({ logger: true })

  // Register internal plugin for oas30-to-zod
  fastify.register(converter)

  // Register @fastify/vite plugin
  await fastify.register(FastifyVite, {
    // root: import.meta.url,
    root: join(dirname(new URL(import.meta.url).pathname), '../../'),
    dev: isDev,
    spa: true,
  })

  fastify.get('/', (_req, reply) => {
    ;(reply as FastifyReply & { html: any }).html()
  })

  await (fastify as FastifyInstance & { vite?: any }).vite.ready()

  return fastify
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = await main()
  await server.listen({ port: 3000 })
}
