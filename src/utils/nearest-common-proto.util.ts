import { protoChain } from './proto-chain.util'

/**
 * Identifies the nearest ancestor common to all the given objects in their prototype chains.
 *
 * For most unrelated objects, this function should return Object.prototype.
 * This function is used internally by the hardMixProtos function to find the common ancestor
 * of all ingredients.
 *
 * @param objs - The objects to find the common ancestor for
 * @returns The nearest common ancestor, or undefined if no objects were provided
 *
 * @internal
 */
export const nearestCommonProto = (...objs: object[]): object | undefined => {
  // If no objects provided, return undefined
  if (objs.length === 0) return undefined

  let commonProto: object | undefined = undefined

  // Get the prototype chain for each object
  const protoChains = objs.map((obj) => protoChain(obj))

  // Find the nearest common ancestor by working backwards from Object.prototype
  while (protoChains.every((protoChain) => protoChain.length > 0)) {
    // Get the last prototype in each chain (closest to Object.prototype)
    const protos = protoChains.map((protoChain) => protoChain.pop())
    const potentialCommonProto = protos[0]

    // If all prototypes are the same, we've found a common ancestor
    if (protos.every((proto) => proto === potentialCommonProto)) commonProto = potentialCommonProto
    else break
  }

  return commonProto
}
