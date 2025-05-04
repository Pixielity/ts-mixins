/**
 * Flattens an array of arrays into a single array.
 *
 * @template T - Type of array elements
 * @param arr - The array of arrays to flatten
 * @returns A flattened array
 *
 * @internal
 */
declare const flatten: <T>(arr: T[][]) => T[];

export { flatten };
