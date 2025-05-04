import { unique } from '../utils/unique.util'
import type { ObjectOfDecorators } from '../interfaces/object-of-decorators.interface'

/**
 * Merges two objects of decorators into one.
 *
 * This function is used internally by the mergePropertyAndMethodDecorators function to merge
 * property or method decorators from multiple classes.
 *
 * @template T - Type of decorator (PropertyDecorator or MethodDecorator)
 * @param o1 - First object of decorators
 * @param o2 - Second object of decorators
 * @returns Merged object of decorators
 *
 * @internal
 */
export const mergeObjectsOfDecorators = <T extends PropertyDecorator | MethodDecorator>(
  o1: ObjectOfDecorators<T>,
  o2: ObjectOfDecorators<T>,
): ObjectOfDecorators<T> => {
  // Get all keys from both objects
  const allKeys = unique([
    ...Object.getOwnPropertyNames(o1 || {}),
    ...Object.getOwnPropertyNames(o2 || {}),
  ])

  // Create a new object with merged decorators for each key
  const mergedObject: ObjectOfDecorators<T> = {}
  for (const key of allKeys) {
    // Create new arrays to avoid modifying the original arrays
    const decorators1 = o1 && o1[key] ? [...o1[key]] : []
    const decorators2 = o2 && o2[key] ? [...o2[key]] : []

    // Concatenate the arrays instead of using unique to preserve all decorators
    mergedObject[key] = [...decorators1, ...decorators2]
  }

  return mergedObject
}
