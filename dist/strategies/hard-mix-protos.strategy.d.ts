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
declare const hardMixProtos: (
  ingredients: any[],
  constructor: Function | null,
  exclude?: string[],
) => object

export { hardMixProtos }
