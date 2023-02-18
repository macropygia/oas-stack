import { oasComponentsToZod } from 'oas30-to-zod'
import stripAnsi from 'strip-ansi'
import YAML from 'yaml'

import type { APIRoute } from 'astro'

type RequestBody = {
  doc: string
  options: any
  prettier: any
}

export const post: APIRoute = async ({ request }) => {
  const body: RequestBody = await request.json().then((body) => body)

  const docStr = body.doc
  const options = body.options
  const prettier = body.prettier

  if (options.disableRules)
    options.disableRules = options.disableRules
      .split(',')
      .map((rule: string) => rule.trim())

  if (options.inheritPrettier) options.inheritPrettier = prettier

  const doc = docStr.startsWith('{') ? JSON.parse(docStr) : YAML.parse(docStr)

  if (typeof doc !== 'object')
    return {
      code: 200,
      body: '',
    }

  try {
    const parsed = await oasComponentsToZod(doc, options)
    return {
      code: 200,
      body: JSON.stringify(parsed),
    }
  } catch (error) {
    if (error instanceof Error)
      return {
        code: 500,
        body: JSON.stringify(stripAnsi(error.message)),
      }
    return {
      code: 500,
      body: 'Unknown error',
    }
  }
}
