import { Class } from '../types/class.type.mjs';
import { Decorators } from '../interfaces/decorators.interface.mjs';
import '../interfaces/property-and-method-decorators.interface.mjs';
import '../interfaces/object-of-decorators.interface.mjs';

/**
 * Gets or creates a decorator object for a class.
 *
 * This function is used internally by the Decorate function to track decorators for inheritance in mixed classes.
 *
 * @param clazz - Class to get decorators for
 * @returns Decorator object for the class
 *
 * @internal
 */
declare const getDecoratorsForClass: (clazz: Class) => Decorators;

export { getDecoratorsForClass };
