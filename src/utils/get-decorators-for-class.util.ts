import type { Class } from '../types/class.type'
import { decorators } from './decorators-map.util'

/**
 * Gets or creates a decorator object for a class.
 *
 * This function is used internally by the Decorate function to track decorators for inheritance in mixed classes.
 *
 * @param clazz - Class to get decorators for
 * @returns Decorator object for the class
 *
 * @internal
 */
export const getDecoratorsForClass = (clazz: Class) => {
  // Get existing decorators for the class
  let decoratorsForClass = decorators.get(clazz)

  // If no decorators exist, create a new object
  if (!decoratorsForClass) {
    decoratorsForClass = {}
    decorators.set(clazz, decoratorsForClass)
  }

  return decoratorsForClass
}
