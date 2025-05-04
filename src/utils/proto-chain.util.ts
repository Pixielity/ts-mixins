/**
 * Returns the full chain of prototypes up until Object.prototype given a starting object.
 *
 * The order of prototypes will be closest to farthest in the chain.
 * This function is used internally by various functions to traverse the prototype chain.
 *
 * @param obj - The object to get the prototype chain for
 * @param currentChain - The current chain (used for recursion)
 * @returns An array of objects representing the prototype chain
 *
 * @internal
 */
export const protoChain = (obj: object, currentChain: object[] = [obj]): object[] => {
  // Get the prototype of the object
  const proto = Object.getPrototypeOf(obj)

  // If we've reached the end of the chain, return the current chain
  if (proto === null) return currentChain

  // Recursively get the rest of the chain
  return protoChain(proto, [...currentChain, proto])
}
