/**
 * Utility function that works like `Object.apply`, but copies getters and setters properly as well.
 * Additionally gives the option to exclude properties by name.
 *
 * @param dest - The destination object
 * @param src - The source object
 * @param exclude - Optional array of property names to exclude
 *
 * @internal
 */
declare const copyProps: (dest: object, src: object, exclude?: string[]) => void

export { copyProps }
