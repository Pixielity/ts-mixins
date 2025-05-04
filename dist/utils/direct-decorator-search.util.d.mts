import { Class } from '../types/class.type.mjs';
import { Decorators } from '../interfaces/decorators.interface.mjs';
import '../interfaces/property-and-method-decorators.interface.mjs';
import '../interfaces/object-of-decorators.interface.mjs';

/**
 * Searches for decorators in direct constituent classes only.
 *
 * This function is used internally by the Mixin function to find decorators to inherit
 * when the decoratorInheritance setting is set to 'direct'.
 *
 * @param classes - Classes to search for decorators
 * @returns Merged decorators from direct constituent classes
 *
 * @internal
 */
declare const directDecoratorSearch: (...classes: Class[]) => Decorators;

export { directDecoratorSearch };
