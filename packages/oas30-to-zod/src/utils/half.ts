/**
 * Split the array in half.
 * @param arr - Array
 * @returns Pair of array
 */
export const half = <T>(arr: T[]): [T[], T[]] =>
  arr.length
    ? [
        arr.slice(0, Math.floor(arr.length / 2)),
        arr.slice(Math.floor(arr.length / 2)),
      ]
    : [[], []]
