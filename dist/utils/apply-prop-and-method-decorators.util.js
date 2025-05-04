'use strict';

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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.applyPropAndMethodDecorators = applyPropAndMethodDecorators;
//# sourceMappingURL=apply-prop-and-method-decorators.util.js.map
//# sourceMappingURL=apply-prop-and-method-decorators.util.js.map