'use strict';

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

// src/utils/decorate-class.util.ts
var decorateClass = (decorator) => (clazz) => {
  const decoratorsForClass = getDecoratorsForClass(clazz);
  let classDecorators = decoratorsForClass.class;
  if (!classDecorators) {
    classDecorators = [];
    decoratorsForClass.class = classDecorators;
  }
  classDecorators.push(decorator);
  return decorator(clazz);
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

// src/decorators/decorate.decorator.ts
var Decorate = (decorator) => (...args) => {
  if (args.length === 1) return decorateClass(decorator)(args[0]);
  return decorateMember(decorator)(
    ...args
  );
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.Decorate = Decorate;
//# sourceMappingURL=decorate.decorator.js.map
//# sourceMappingURL=decorate.decorator.js.map