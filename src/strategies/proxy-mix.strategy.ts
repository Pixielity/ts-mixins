import { getIngredientWithProp } from './get-ingredient-with-prop.strategy'

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
export const proxyMix = (ingredients: any[], prototype = Object.prototype): any =>
  new Proxy(
    {},
    {
      /**
       * Returns the prototype of the mixed object.
       */
      getPrototypeOf() {
        return prototype
      },

      /**
       * Prevents setting the prototype of the mixed object.
       */
      setPrototypeOf() {
        throw Error('Cannot set prototype of Proxies created by ts-mixer')
      },

      /**
       * Returns the property descriptor for a property from the appropriate ingredient.
       */
      getOwnPropertyDescriptor(_, prop) {
        return Object.getOwnPropertyDescriptor(getIngredientWithProp(prop, ingredients) || {}, prop)
      },

      /**
       * Prevents defining new properties on the mixed object.
       */
      defineProperty() {
        throw new Error('Cannot define new properties on Proxies created by ts-mixer')
      },

      /**
       * Checks if a property exists on any ingredient or the prototype.
       */
      has(_, prop) {
        return (
          getIngredientWithProp(prop, ingredients) !== undefined ||
          (prototype as any)[prop] !== undefined
        )
      },

      /**
       * Gets a property from the appropriate ingredient or the prototype.
       */
      get(_, prop) {
        const ingredient = getIngredientWithProp(prop, ingredients)
        if (ingredient !== undefined) {
          return ingredient[prop]
        }
        // Use a type assertion to tell TypeScript this access is valid
        return (prototype as any)[prop]
      },

      /**
       * Sets a property on the appropriate ingredient.
       */
      set(_, prop, val) {
        const ingredientWithProp = getIngredientWithProp(prop, ingredients)
        if (ingredientWithProp === undefined)
          throw new Error('Cannot set new properties on Proxies created by ts-mixer')

        ingredientWithProp[prop] = val
        return true
      },

      /**
       * Prevents deleting properties from the mixed object.
       */
      deleteProperty() {
        throw new Error('Cannot delete properties on Proxies created by ts-mixer')
      },

      /**
       * Returns all own property names from all ingredients.
       */
      ownKeys() {
        return ingredients
          .map(Object.getOwnPropertyNames)
          .reduce((prev, curr) => curr.concat(prev.filter((key) => curr.indexOf(key) < 0)))
      },
    },
  )
