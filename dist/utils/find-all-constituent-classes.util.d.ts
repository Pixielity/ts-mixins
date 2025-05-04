import { Class } from '../types/class.type.js'

/**
 * Finds all constituent classes for a set of classes, including those in the prototype chain and mixins.
 *
 * This function is used internally by the deepDecoratorSearch function to find all classes
 * that might have decorators to inherit.
 *
 * @param classes - Classes to find constituents for
 * @returns Array of all constituent classes
 *
 * @internal
 */
declare const findAllConstituentClasses: (...classes: Class[]) => Class[]

export { findAllConstituentClasses }
