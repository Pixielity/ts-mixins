import { copyProps, nearestCommonProto, protoChain } from '../utils'

/**
 * Creates a new prototype object that is a mixture of the given prototypes.
 *
 * The mixing is achieved by first identifying the nearest common ancestor and using it as the prototype for a new object.
 * Then all properties/methods downstream of this prototype (ONLY downstream) are copied into the new object.
 *
 * The resulting prototype is more performant than softMixProtos(...), as well as ES5 compatible.
 * However, it's not as flexible as updates to the source prototypes aren't captured by the mixed result.
 *
 * @param ingredients - Prototype ingredients to mix
 * @param constructor - Constructor function for the mixed prototype, or null
 * @param exclude - Optional array of property names to exclude
 * @returns A new prototype object that mixes the ingredients
 *
 * @internal
 */
export const hardMixProtos = (
  ingredients: any[],
  constructor: Function | null,
  exclude: string[] = [],
): object => {
  // Find the nearest common ancestor of all ingredients, or use Object.prototype if none
  const base = nearestCommonProto(...ingredients) ?? Object.prototype

  // Create a new object with the common ancestor as its prototype
  const mixedProto = Object.create(base)

  // Keeps track of prototypes we've already visited to avoid copying the same properties multiple times.
  // We init the list with the proto chain below the nearest common ancestor because we don't want any of those
  // methods mixed in when they will already be accessible via prototype access.
  const visitedProtos = protoChain(base)

  // Process each ingredient
  for (const prototype of ingredients) {
    // Get the prototype chain for this ingredient
    const protos = protoChain(prototype)

    // Apply the prototype chain in reverse order so that old methods don't override newer ones.
    // This ensures that properties closer to the actual class take precedence over properties
    // from further up the prototype chain.
    for (let i = protos.length - 1; i >= 0; i--) {
      const newProto = protos[i]

      // Only copy properties from prototypes we haven't visited yet
      if (visitedProtos.indexOf(newProto) === -1) {
        copyProps(mixedProto, newProto, ['constructor', ...exclude])
        visitedProtos.push(newProto)
      }
    }
  }

  // Set the constructor if provided
  if (constructor !== null) {
    mixedProto.constructor = constructor
  }

  return mixedProto
}
