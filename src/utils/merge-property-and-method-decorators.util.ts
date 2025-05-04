import type { PropertyAndMethodDecorators } from '../interfaces/property-and-method-decorators.interface'
import { mergeObjectsOfDecorators } from './merge-objects-of-decorators.util'

/**
 * Merges two property and method decorator objects into one.
 *
 * This function is used internally by the mergeDecorators function to merge property and method decorators
 * from multiple classes.
 *
 * @param d1 - First property and method decorators
 * @param d2 - Second property and method decorators
 * @returns Merged property and method decorators
 *
 * @internal
 */
export const mergePropertyAndMethodDecorators = (
  d1: PropertyAndMethodDecorators,
  d2: PropertyAndMethodDecorators,
): PropertyAndMethodDecorators => ({
  // Merge property decorators
  property: mergeObjectsOfDecorators(d1?.property ?? {}, d2?.property ?? {}),

  // Merge method decorators
  method: mergeObjectsOfDecorators(d1?.method ?? {}, d2?.method ?? {}),
})
