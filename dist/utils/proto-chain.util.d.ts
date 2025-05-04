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
declare const protoChain: (obj: object, currentChain?: object[]) => object[]

export { protoChain }
