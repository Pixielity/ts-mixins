/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/decorators-map.util.ts
var decorators = /* @__PURE__ */ new Map();

// src/utils/get-decorators-for-class.util.ts
var getDecoratorsForClass = (clazz) => {
  let decoratorsForClass = decorators.get(clazz);
  if (!decoratorsForClass) {
    decoratorsForClass = {};
    decorators.set(clazz, decoratorsForClass);
  }
  return decoratorsForClass;
};

// src/utils/decorate-member.util.ts
var decorateMember = (decorator) => (object, key, descriptor) => {
  var _a, _b, _c;
  const decoratorTargetType = typeof object === "function" ? "static" : "instance";
  const decoratorType = typeof object[key] === "function" ? "method" : "property";
  const clazz = decoratorTargetType === "static" ? object : object.constructor;
  const decoratorsForClass = getDecoratorsForClass(clazz);
  const decoratorsForTargetType = (_a = decoratorsForClass == null ? void 0 : decoratorsForClass[decoratorTargetType]) != null ? _a : {};
  decoratorsForClass[decoratorTargetType] = decoratorsForTargetType;
  const decoratorsForType = (_b = decoratorsForTargetType == null ? void 0 : decoratorsForTargetType[decoratorType]) != null ? _b : {};
  decoratorsForTargetType[decoratorType] = decoratorsForType;
  const keyStr = typeof key === "symbol" ? key.toString() : key;
  const decoratorsForKey = (_c = decoratorsForType == null ? void 0 : decoratorsForType[keyStr]) != null ? _c : [];
  decoratorsForType[keyStr] = decoratorsForKey;
  decoratorsForKey.push(decorator);
  if (descriptor !== void 0) {
    return decorator(object, key, descriptor);
  } else {
    return decorator(object, key);
  }
};

export { decorateMember };
//# sourceMappingURL=decorate-member.util.mjs.map
//# sourceMappingURL=decorate-member.util.mjs.map