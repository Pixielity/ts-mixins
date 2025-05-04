import { PropertyAndMethodDecorators } from '../interfaces/property-and-method-decorators.interface.js';
import '../interfaces/object-of-decorators.interface.js';

/**
 * Applies property and method decorators to a target object.
 *
 * This function is used internally by the Mixin function to apply property and method decorators
 * to the mixed class and its prototype.
 *
 * @param propAndMethodDecorators - Property and method decorators to apply
 * @param target - Target object to apply decorators to
 * @param originalTargets - Original objects that had these decorators (for proper context)
 *
 * @internal
 */
declare const applyPropAndMethodDecorators: (propAndMethodDecorators: PropertyAndMethodDecorators, target: Object, originalTargets?: Object[]) => void;

export { applyPropAndMethodDecorators };
