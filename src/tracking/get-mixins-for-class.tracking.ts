import type { Class } from '../types/class.type'
import { mixins } from './mixins-map.tracking'

/**
 * Gets the constituent classes for a mixin class.
 *
 * @param clazz - The mixin class to get constituents for
 * @returns An array of constituent classes, or undefined if not a mixin
 *
 * @example
 * const AB = Mixin(A, B);
 * const mixins = getMixinsForClass(AB); // [A, B]
 */
export const getMixinsForClass = (clazz: Class): Function[] | undefined => mixins.get(clazz)
