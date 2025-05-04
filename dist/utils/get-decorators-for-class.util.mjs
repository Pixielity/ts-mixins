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

export { getDecoratorsForClass };
//# sourceMappingURL=get-decorators-for-class.util.mjs.map
//# sourceMappingURL=get-decorators-for-class.util.mjs.map