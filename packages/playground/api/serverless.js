import u from '@fastify/cors'
import g from 'fastify'
import { oasComponentsToZod as y } from 'oas30-to-zod'
import d from 'strip-ansi'
import l from 'yaml'
var p = (o, n, c) => {
  o.post('/api/z', async (m) => {
    let s = m.body,
      i = s.doc,
      r = s.options,
      f = s.prettier
    r.disableRules &&
      (r.disableRules = r.disableRules.split(',').map((t) => t.trim())),
      r.inheritPrettier && (r.inheritPrettier = f)
    let a = i.startsWith('{') ? JSON.parse(i) : l.parse(i)
    if (typeof a != 'object') return ''
    try {
      let t = await y(a, r)
      return JSON.stringify(t)
    } catch (t) {
      return t instanceof Error ? JSON.stringify(d(t.message)) : 'Unknown error'
    }
  }),
    c()
}
var e = g({ logger: !0 })
e.register(p)
await e.register(u, { origin: /\.vercel\.app$/ })
async function b(o, n) {
  await e.ready(), e.server.emit('request', o, n)
}
export { b as default }
