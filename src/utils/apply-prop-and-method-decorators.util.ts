import type { PropertyAndMethodDecorators } from "../interfaces/property-and-method-decorators.interface"

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
export const applyPropAndMethodDecorators = (
  propAndMethodDecorators: PropertyAndMethodDecorators,
  target: Object,
  originalTargets: Object[] = [],
): void => {
  const propDecorators = propAndMethodDecorators.property
  const methodDecorators = propAndMethodDecorators.method

  // Apply property decorators
  if (propDecorators) {
    for (const key in propDecorators) {
      for (const decorator of propDecorators[key]) {
        decorator(target, key)
      }
    }
  }

  // Apply method decorators
  if (methodDecorators) {
    for (const key in methodDecorators) {
      // Get the descriptor from the target
      const descriptor = Object.getOwnPropertyDescriptor(target, key)

      if (descriptor) {
        // Apply each decorator to the target (mixed class)
        for (const decorator of methodDecorators[key]) {
          // Apply the decorator and update the property descriptor if needed
          const result = decorator(target, key, descriptor)

          if (result) {
            Object.defineProperty(target, key, result)
          }
        }
      }

      // For static method decorators, we need to ensure they're called with both
      // the original class and the mixed class
      if (target.constructor === Function) { // This is a static context
        // We've already applied the decorators to the target (mixed class) above
        // Now we need to apply them to the original classes as well
        for (const originalTarget of originalTargets) {
          const originalDescriptor = Object.getOwnPropertyDescriptor(originalTarget, key)
          if (originalDescriptor) {
            for (const decorator of methodDecorators[key]) {
              decorator(originalTarget, key, originalDescriptor)
            }
          }
        }
      }
    }
  }
}
