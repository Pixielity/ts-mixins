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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { decorateClass };
//# sourceMappingURL=decorate-class.util.mjs.map
//# sourceMappingURL=decorate-class.util.mjs.map