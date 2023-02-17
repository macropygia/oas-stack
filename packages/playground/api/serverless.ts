import { join, dirname } from 'node:path'

import cors from '@fastify/cors'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FastifyVite from '@fastify/vite'
import * as dotenv from 'dotenv'
import Fastify from 'fastify'

import { converter } from '../src/server/converter.js'

import type { FastifyReply, FastifyInstance } from 'fastify'

dotenv.config()

const isDev = process.env['NODE_ENV'] !== 'production' ? true : false

const fastify = Fastify({ logger: isDev })

await fastify.register(cors, {
  origin: '*',
})

// Register internal plugin for oas30-to-zod
fastify.register(converter)

// Register @fastify/vite plugin
await fastify.register(FastifyVite, {
  root: join(dirname(new URL(import.meta.url).pathname), '../'),
  dev: isDev,
  spa: true,
})

fastify.get('/', (_req, reply) => {
  ;(reply as FastifyReply & { html: any }).html()
})

export default async function handler(req: Request, res: Response) {
  await (fastify as FastifyInstance & { vite?: any }).vite.ready()

  fastify.server.emit('request', req, res)
}
