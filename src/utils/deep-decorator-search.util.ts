import type { Class } from '../types/class.type'
import type { Decorators } from '../interfaces/decorators.interface'
import { findAllConstituentClasses } from './find-all-constituent-classes.util'
import { decorators } from './decorators-map.util'
import { mergeDecorators } from './merge-decorators.util'

/**
 * Searches for decorators in all constituent classes, including those in the prototype chain and mixins.
 *
 * This function is used internally by the Mixin function to find all decorators to inherit
 * when the decoratorInheritance setting is set to 'deep'.
 *
 * @param classes - Classes to search for decorators
 * @returns Merged decorators from all constituent classes
 *
 * @internal
 */
export const deepDecoratorSearch = (...classes: Class[]): Decorators => {
  // Find all constituent classes and get their decorators
  const decoratorsForClassChain = findAllConstituentClasses(...classes)
    .map((clazz) => decorators.get(clazz as Class))
    .filter((decorators) => !!decorators) as Decorators[]

  // If no decorators found, return empty object
  if (decoratorsForClassChain.length == 0) return {}

  // If only one decorator found, return it
  if (decoratorsForClassChain.length == 1) return decoratorsForClassChain[0]

  // Merge all decorators
  return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2))
}
