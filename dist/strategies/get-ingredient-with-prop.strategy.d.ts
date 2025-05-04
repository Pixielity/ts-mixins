/**
 * Finds the ingredient with the given prop, searching in reverse order and breadth-first if searching ingredient
 * prototypes is required.
 *
 * This function is used by the proxy mixing strategy to find the ingredient that has a specific property.
 * It searches through the prototype chains of all ingredients in a breadth-first manner.
 *
 * @param prop - Property to search for
 * @param ingredients - Ingredients to search in
 * @returns The ingredient with the property, or undefined if not found
 *
 * @internal
 */
declare const getIngredientWithProp: (prop: string | number | symbol, ingredients: any[]) => any

export { getIngredientWithProp }
