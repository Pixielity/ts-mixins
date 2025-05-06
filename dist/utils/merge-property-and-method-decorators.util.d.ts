import { PropertyAndMethodDecorators } from '../interfaces/property-and-method-decorators.interface.js';
import '../interfaces/object-of-decorators.interface.js';

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
declare const mergePropertyAndMethodDecorators: (d1: PropertyAndMethodDecorators, d2: PropertyAndMethodDecorators) => PropertyAndMethodDecorators;

export { mergePropertyAndMethodDecorators };
