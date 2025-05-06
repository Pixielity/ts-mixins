/**
 * Returns a new array with duplicate elements removed.
 *
 * This function is used internally by various functions to ensure uniqueness of elements.
 *
 * @template T - Type of array elements
 * @param arr - The array to remove duplicates from
 * @returns A new array with duplicates removed
 *
 * @internal
 */
declare const unique: <T>(arr: T[]) => T[];

export { unique };
