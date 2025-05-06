import { Class } from '../types/class.type.js';
import { Decorators } from '../interfaces/decorators.interface.js';
import '../interfaces/property-and-method-decorators.interface.js';
import '../interfaces/object-of-decorators.interface.js';

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
declare const deepDecoratorSearch: (...classes: Class[]) => Decorators;

export { deepDecoratorSearch };
