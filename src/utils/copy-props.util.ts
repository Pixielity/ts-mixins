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
export const copyProps = (dest: object, src: object, exclude: string[] = []): void => {
  // Get all property descriptors from the source object
  const props = Object.getOwnPropertyDescriptors(src)

  // Remove excluded properties
  for (const prop of exclude) delete props[prop]

  // Define all properties on the destination object
  Object.defineProperties(dest, props)
}
