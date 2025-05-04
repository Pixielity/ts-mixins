/**
 * Flattens an array of arrays into a single array.
 *
 * @template T - Type of array elements
 * @param arr - The array of arrays to flatten
 * @returns A flattened array
 *
 * @internal
 */
export const flatten = <T>(arr: T[][]): T[] =>
  arr.length === 0 ? [] : arr.length === 1 ? arr[0] : arr.reduce((a1, a2) => [...a1, ...a2])
