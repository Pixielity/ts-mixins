import { mixins } from './mixins-map.tracking'

/**
 * Checks if an instance has a mixin in its prototype chain.
 *
 * This function checks if an instance is an instance of a mixin class or has a mixin class
 * in its prototype chain. It also checks for mixins of mixins.
 *
 * @template M - Type of the mixin
 * @param instance - The instance to check
 * @param mixin - The mixin class to check for
 * @returns True if the instance has the mixin, false otherwise
 *
 * @example
 * ```typescript
 * const AB = Mixin(A, B);
 * const instance = new AB();
 *
 * if (hasMixin(instance, A)) {
 *   // instance has A
 * }
 * ```
 */
export const hasMixin = <M>(
  instance: any,
  mixin: abstract new (...args: any[]) => M,
): instance is M => {
  if (!instance) return false

  // Direct instanceof check
  if (instance instanceof mixin) return true

  const constructor = instance?.constructor

  if (!constructor) return false

  // Track visited constructors to avoid infinite loops
  const visited = new Set<Function>()
  let frontier = new Set<Function>()
  frontier.add(constructor)

  while (frontier.size > 0) {
    // Check if the frontier has the mixin we're looking for
    if (frontier.has(mixin)) return true

    // Mark all frontier items as visited
    frontier.forEach((item) => visited.add(item))

    // Build a new frontier based on the associated mixin classes and prototype chains of each frontier item
    const newFrontier = new Set<Function>()
    frontier.forEach((item) => {
      // Get mixins for this constructor or use its parent constructor if it's not Object
      const itemPrototype = Object.getPrototypeOf(item.prototype)
      const itemConstituents =
        ((item as any).mixins ??
        mixins.get(item) ??
        (itemPrototype && itemPrototype.constructor && itemPrototype.constructor !== Object))
          ? [itemPrototype.constructor]
          : []

      // Add unvisited constituents to the new frontier
      if (itemConstituents) {
        itemConstituents.forEach((constituent: Function) => {
          if (constituent && !visited.has(constituent) && !frontier.has(constituent)) {
            newFrontier.add(constituent)
          }
        })
      }
    })

    // We have a new frontier, now search again
    frontier = newFrontier
  }

  // If we get here, we couldn't find the mixin anywhere in the prototype chain or associated mixin classes
  return false
}
