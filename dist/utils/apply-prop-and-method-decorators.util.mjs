/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/apply-prop-and-method-decorators.util.ts
var applyPropAndMethodDecorators = (propAndMethodDecorators, target, originalTargets = []) => {
  const propDecorators = propAndMethodDecorators.property;
  const methodDecorators = propAndMethodDecorators.method;
  if (propDecorators) {
    for (const key in propDecorators) {
      for (const decorator of propDecorators[key]) {
        decorator(target, key);
      }
    }
  }
  if (methodDecorators) {
    for (const key in methodDecorators) {
      const descriptor = Object.getOwnPropertyDescriptor(target, key);
      if (descriptor) {
        for (const decorator of methodDecorators[key]) {
          const result = decorator(target, key, descriptor);
          if (result) {
            Object.defineProperty(target, key, result);
          }
        }
      }
      if (target.constructor === Function) {
        for (const originalTarget of originalTargets) {
          const originalDescriptor = Object.getOwnPropertyDescriptor(originalTarget, key);
          if (originalDescriptor) {
            for (const decorator of methodDecorators[key]) {
              decorator(originalTarget, key, originalDescriptor);
            }
          }
        }
      }
    }
  }
};

export { applyPropAndMethodDecorators };
//# sourceMappingURL=apply-prop-and-method-decorators.util.mjs.map
//# sourceMappingURL=apply-prop-and-method-decorators.util.mjs.map