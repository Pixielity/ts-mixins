/**
 * "Mixes" ingredients by wrapping them in a Proxy.
 *
 * The optional prototype argument allows the mixed object to sit downstream of an existing prototype chain.
 * Note that "properties" cannot be added, deleted, or modified.
 *
 * This strategy is less performant than the hard mix strategy, but it reflects changes to the source objects.
 *
 * @param ingredients - Ingredients to mix
 * @param prototype - Optional prototype for the mixed object
 * @returns A proxy that mixes the ingredients
 *
 * @internal
 */
declare const proxyMix: (ingredients: any[], prototype?: Object) => any;

export { proxyMix };
