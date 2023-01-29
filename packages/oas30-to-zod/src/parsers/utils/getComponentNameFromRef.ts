export const getComponentNameFromRef = (ref: string): string | false =>
  ref.startsWith('#/components/schemas/')
    ? ref.replace('#/components/schemas/', '')
    : false
