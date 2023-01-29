import { describe, test, expect } from 'vitest'

import { oasComponentsToZod } from '../src/oasComponentsToZod.js'

describe('oasComponentsToZod (object)', async () => {
  test('Enable object autocomplete', async () => {
    await expect(
      oasComponentsToZod('__tests__/object.yml', {
        withoutImport: true,
        withoutExport: true,
        disableAutocomplete: false,
      })
    ).resolves.toMatchSnapshot()
  })

  test('Disable object autocomplete', async () => {
    await expect(
      oasComponentsToZod('__tests__/object.yml', {
        withoutImport: true,
        withoutExport: true,
        disableAutocomplete: true,
      })
    ).resolves.toMatchSnapshot()
  })
})
