import { Decorators } from '../interfaces/decorators.interface.js'
import '../interfaces/property-and-method-decorators.interface.js'
import '../interfaces/object-of-decorators.interface.js'

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
declare const mergeDecorators: (d1: Decorators, d2: Decorators) => Decorators

export { mergeDecorators }
