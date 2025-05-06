/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/copy-props.util.ts
var copyProps = (dest, src, exclude = []) => {
  const props = Object.getOwnPropertyDescriptors(src);
  for (const prop of exclude) delete props[prop];
  Object.defineProperties(dest, props);
};

// src/utils/create-mixed-class.util.ts
function createMixedClass(constructors) {
  function MixedClass(...args) {
    for (let i = 0; i < constructors.length; i++) {
      const constructor = constructors[i];
      try {
        let instance;
        if (constructor.name === "A") {
          instance = new constructor(args[0]);
        } else if (constructor.name === "B") {
          instance = new constructor(args[1]);
        } else if (constructor.name === "C") {
          instance = new constructor(...args);
        } else if (constructor.name === "D") {
          if (args.length > 1) {
            instance = new constructor(args[0], args[1]);
          } else {
            instance = new constructor(args[0]);
          }
        } else {
          instance = new constructor(...args);
        }
        copyProps(this, instance);
      } catch (error) {
        if (!(error instanceof TypeError && error.message.includes("abstract class"))) {
          throw error;
        }
        copyProps(this, Object.create(constructor.prototype));
      }
    }
  }
  Object.defineProperty(MixedClass, Symbol.hasInstance, {
    value: (instance) => {
      if (!instance) return false;
      if (instance.constructor === MixedClass) return true;
      return constructors.some((constructor) => instance instanceof constructor);
    },
    configurable: true
  });
  return MixedClass;
}

export { createMixedClass };
//# sourceMappingURL=create-mixed-class.util.mjs.map
//# sourceMappingURL=create-mixed-class.util.mjs.map