import type { Decorators } from '../interfaces/decorators.interface'
import { unique } from '../utils/unique.util'
import { mergePropertyAndMethodDecorators } from './merge-property-and-method-decorators.util'

/**
 * Merges two decorator objects into one.
 *
 * This function is used internally by the decorator search functions to merge decorators from multiple classes.
 *
 * @param d1 - First decorators
 * @param d2 - Second decorators
 * @returns Merged decorators
 *
 * @internal
 */
export const mergeDecorators = (d1: Decorators, d2: Decorators): Decorators => ({
  // Merge class decorators (removing duplicates)
  class: unique([...(d1?.class ?? []), ...(d2?.class ?? [])]),

  // Merge static property and method decorators
  static: mergePropertyAndMethodDecorators(d1?.static ?? {}, d2?.static ?? {}),

  // Merge instance property and method decorators
  instance: mergePropertyAndMethodDecorators(d1?.instance ?? {}, d2?.instance ?? {}),
})
