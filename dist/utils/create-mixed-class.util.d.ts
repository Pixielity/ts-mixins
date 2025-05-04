import { Class } from '../types/class.type.js';

/**
 * Creates a mixed class constructor function that instantiates and combines instances of all constituent classes.
 *
 * This function is used internally by the Mixin function to create the constructor function for the mixed class.
 * The constructor function creates instances of all constituent classes and copies their properties to the mixed instance.
 *
 * @param constructors - The constituent class constructors
 * @returns A constructor function for the mixed class
 *
 * @internal
 */
declare function createMixedClass(constructors: Class[]): Function;

export { createMixedClass };
