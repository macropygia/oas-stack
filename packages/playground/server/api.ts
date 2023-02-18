import cors from '@fastify/cors'
import * as dotenv from 'dotenv'

import { server } from './server.js'

dotenv.config()

const port = process.env['PUBLIC_API_PORT']
  ? parseInt(process.env['PUBLIC_API_PORT'], 10)
  : 2999

await server.register(cors, {
  origin: '*',
})

await server.ready()

await server.listen({ port })
