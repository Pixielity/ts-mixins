import { proxyMix } from './proxy-mix.strategy'

/**
 * Creates a new proxy-prototype object that is a "soft" mixture of the given prototypes.
 *
 * The mixing is achieved by proxying all property access to the ingredients.
 * This is not ES5 compatible and less performant.
 * However, any changes made to the source prototypes will be reflected in the proxy-prototype,
 * which may be desirable.
 *
 * @param ingredients - Prototype ingredients to mix
 * @param constructor - Constructor function for the mixed prototype
 * @returns A proxy-prototype that mixes the ingredients
 *
 * @internal
 */
export const softMixProtos = (ingredients: any[], constructor: Function): object =>
  proxyMix([...ingredients, { constructor }])
