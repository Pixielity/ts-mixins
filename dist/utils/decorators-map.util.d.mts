import { Class } from '../types/class.type.mjs';
import { Decorators } from '../interfaces/decorators.interface.mjs';
import '../interfaces/property-and-method-decorators.interface.mjs';
import '../interfaces/object-of-decorators.interface.mjs';

/**
 * Map to store decorators for classes.
 *
 * This map is used internally by the Decorate function to track decorators for inheritance in mixed classes.
 *
 * @internal
 */
declare const decorators: Map<Class, Decorators>;

export { decorators };
