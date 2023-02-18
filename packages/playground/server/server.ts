import Fastify from 'fastify'

import { converter } from './converter.js'

const server = Fastify({ logger: true })

server.register(converter)

export { server }
