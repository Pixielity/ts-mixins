import { Class } from '../types/class.type.js';
import { Decorators } from '../interfaces/decorators.interface.js';
import '../interfaces/property-and-method-decorators.interface.js';
import '../interfaces/object-of-decorators.interface.js';

/**
 * Map to store decorators for classes.
 *
 * This map is used internally by the Decorate function to track decorators for inheritance in mixed classes.
 *
 * @internal
 */
declare const decorators: Map<Class, Decorators>;

export { decorators };
