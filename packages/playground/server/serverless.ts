import cors from '@fastify/cors'

import { server } from './server.js'

import type { IncomingMessage, ServerResponse } from 'node:http'

await server.register(cors, {
  origin: /\.vercel\.app$/,
})

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  await server.ready()

  server.server.emit('request', req, res)
}
