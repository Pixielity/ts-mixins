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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.getDecoratorsForClass = getDecoratorsForClass;
//# sourceMappingURL=get-decorators-for-class.util.js.map
//# sourceMappingURL=get-decorators-for-class.util.js.map