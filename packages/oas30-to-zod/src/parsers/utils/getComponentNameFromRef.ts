/**
 * Strip prefix from the value of $ref
 * @param ref - Value of $ref
 * @returns Result string or `false`
 */
export const getComponentNameFromRef = (ref: string): string | false =>
  ref.startsWith('#/components/schemas/')
    ? ref.replace('#/components/schemas/', '')
    : false
