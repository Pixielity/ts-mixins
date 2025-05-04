import type { Class } from '../types/class.type'
import { protoChain } from '../utils/proto-chain.util'
import { getMixinsForClass } from '../tracking/get-mixins-for-class.tracking'

/**
 * Finds all constituent classes for a set of classes, including those in the prototype chain and mixins.
 *
 * This function is used internally by the deepDecoratorSearch function to find all classes
 * that might have decorators to inherit.
 *
 * @param classes - Classes to find constituents for
 * @returns Array of all constituent classes
 *
 * @internal
 */
export const findAllConstituentClasses = (...classes: Class[]): Class[] => {
  // Use sets to avoid duplicates
  const allClasses = new Set<Class>()
  const frontier = new Set<Class>([...classes])

  // Breadth-first search to find all constituent classes
  while (frontier.size > 0) {
    for (const clazz of frontier) {
      // Get classes from the prototype chain
      const protoChainClasses = protoChain(clazz.prototype).map((proto) => proto.constructor)

      // Get classes from mixins
      const mixinClasses = getMixinsForClass(clazz) ?? []

      // Combine all potential new classes
      const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses] as Class[]

      // Filter out classes we've already seen
      const newClasses = potentiallyNewClasses.filter((c) => !allClasses.has(c))

      // Add new classes to the frontier
      for (const newClass of newClasses) frontier.add(newClass)

      // Add the current class to the set of all classes
      allClasses.add(clazz)

      // Remove the current class from the frontier
      frontier.delete(clazz)
    }
  }

  return [...allClasses]
}
