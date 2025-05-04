import { protoChain } from '../utils/proto-chain.util'

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
export const getIngredientWithProp = (prop: string | number | symbol, ingredients: any[]): any => {
  // Get the prototype chain for each ingredient
  const protoChains = ingredients.map((ingredient) => protoChain(ingredient))

  // Since we search breadth-first, we need to keep track of our depth in the prototype chains
  let protoDepth = 0

  // Not all prototype chains are the same depth, so this remains true as long as at least one of the ingredients'
  // prototype chains has an object at this depth
  let protosAreLeftToSearch = true

  while (protosAreLeftToSearch) {
    // With the start of each horizontal slice, we assume this is the one that's deeper than any of the proto chains
    protosAreLeftToSearch = false

    // Scan through the ingredients right to left (to prioritize later ingredients)
    for (let i = ingredients.length - 1; i >= 0; i--) {
      const searchTarget = protoChains[i][protoDepth]
      if (searchTarget !== undefined && searchTarget !== null) {
        // If we find something, this is proof that this horizontal slice potentially has more objects to search
        protosAreLeftToSearch = true

        // Eureka, we found it
        if (Object.getOwnPropertyDescriptor(searchTarget, prop) != undefined) {
          return protoChains[i][0]
        }
      }
    }

    // Move to the next level in the prototype chain
    protoDepth++
  }

  // Property not found in any ingredient
  return undefined
}
