import type { Class } from '../types/class.type'
import type { Decorators } from '../interfaces/decorators.interface'
import { getDecoratorsForClass } from './get-decorators-for-class.util'
import { mergeDecorators } from './merge-decorators.util'

/**
 * Searches for decorators in direct constituent classes only.
 *
 * This function is used internally by the Mixin function to find decorators to inherit
 * when the decoratorInheritance setting is set to 'direct'.
 *
 * @param classes - Classes to search for decorators
 * @returns Merged decorators from direct constituent classes
 *
 * @internal
 */
export const directDecoratorSearch = (...classes: Class[]): Decorators => {
  // Get decorators for each class
  const classDecorators = classes.map((clazz) => getDecoratorsForClass(clazz))

  // If no decorators found, return empty object
  if (classDecorators.length === 0) return {}

  // If only one decorator found, return it
  if (classDecorators.length === 1) return classDecorators[0]

  // Merge all decorators
  return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2))
}
