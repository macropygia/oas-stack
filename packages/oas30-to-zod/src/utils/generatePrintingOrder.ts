import type { ComponentDeps, ComponentName } from '@/types/index.js'

/**
 * Generate printing order based on dependencies.
 * @param remains - Target components
 * @param printingOrder - Accumulator
 * @returns Printing Order
 */
export const generatePrintingOrder = (
  remains: ComponentDeps,
  printingOrder: ComponentName[] = []
) => {
  Object.entries(remains).forEach(([comp, deps]) => {
    const missingDeps = deps.filter((dep) => !printingOrder.includes(dep))
    if (missingDeps.length === 0) {
      printingOrder.push(comp)
      delete remains[comp]
    }
  })

  if (Object.keys(remains).length !== 0)
    generatePrintingOrder(remains, printingOrder)

  return printingOrder
}
