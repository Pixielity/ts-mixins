import { Class } from '../types/class.type.js';

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
declare const getMixinsForClass: (clazz: Class) => Function[] | undefined;

export { getMixinsForClass };
