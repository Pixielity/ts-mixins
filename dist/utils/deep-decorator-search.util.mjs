// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};

// src/tracking/mixins-map.tracking.ts
var mixins = /* @__PURE__ */ new WeakMap();

// src/tracking/get-mixins-for-class.tracking.ts
var getMixinsForClass = (clazz) => mixins.get(clazz);

// src/utils/find-all-constituent-classes.util.ts
var findAllConstituentClasses = (...classes) => {
  var _a;
  const allClasses = /* @__PURE__ */ new Set();
  const frontier = /* @__PURE__ */ new Set([...classes]);
  while (frontier.size > 0) {
    for (const clazz of frontier) {
      const protoChainClasses = protoChain(clazz.prototype).map((proto) => proto.constructor);
      const mixinClasses = (_a = getMixinsForClass(clazz)) != null ? _a : [];
      const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
      const newClasses = potentiallyNewClasses.filter((c) => !allClasses.has(c));
      for (const newClass of newClasses) frontier.add(newClass);
      allClasses.add(clazz);
      frontier.delete(clazz);
    }
  }
  return [...allClasses];
};

// src/utils/decorators-map.util.ts
var decorators = /* @__PURE__ */ new Map();

// src/utils/unique.util.ts
var unique = (arr) => arr.filter((e, i) => arr.indexOf(e) === i);

// src/utils/merge-objects-of-decorators.util.ts
var mergeObjectsOfDecorators = (o1, o2) => {
  const allKeys = unique([...Object.getOwnPropertyNames(o1 || {}), ...Object.getOwnPropertyNames(o2 || {})]);
  const mergedObject = {};
  for (const key of allKeys) {
    const decorators1 = o1 && o1[key] ? [...o1[key]] : [];
    const decorators2 = o2 && o2[key] ? [...o2[key]] : [];
    mergedObject[key] = [...decorators1, ...decorators2];
  }
  return mergedObject;
};

// src/utils/merge-property-and-method-decorators.util.ts
var mergePropertyAndMethodDecorators = (d1, d2) => {
  var _a, _b, _c, _d;
  return {
    // Merge property decorators
    property: mergeObjectsOfDecorators((_a = d1 == null ? void 0 : d1.property) != null ? _a : {}, (_b = d2 == null ? void 0 : d2.property) != null ? _b : {}),
    // Merge method decorators
    method: mergeObjectsOfDecorators((_c = d1 == null ? void 0 : d1.method) != null ? _c : {}, (_d = d2 == null ? void 0 : d2.method) != null ? _d : {})
  };
};

// src/utils/merge-decorators.util.ts
var mergeDecorators = (d1, d2) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    // Merge class decorators (removing duplicates)
    class: unique([...(_a = d1 == null ? void 0 : d1.class) != null ? _a : [], ...(_b = d2 == null ? void 0 : d2.class) != null ? _b : []]),
    // Merge static property and method decorators
    static: mergePropertyAndMethodDecorators((_c = d1 == null ? void 0 : d1.static) != null ? _c : {}, (_d = d2 == null ? void 0 : d2.static) != null ? _d : {}),
    // Merge instance property and method decorators
    instance: mergePropertyAndMethodDecorators((_e = d1 == null ? void 0 : d1.instance) != null ? _e : {}, (_f = d2 == null ? void 0 : d2.instance) != null ? _f : {})
  };
};

// src/utils/deep-decorator-search.util.ts
var deepDecoratorSearch = (...classes) => {
  const decoratorsForClassChain = findAllConstituentClasses(...classes).map((clazz) => decorators.get(clazz)).filter((decorators2) => !!decorators2);
  if (decoratorsForClassChain.length == 0) return {};
  if (decoratorsForClassChain.length == 1) return decoratorsForClassChain[0];
  return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { deepDecoratorSearch };
//# sourceMappingURL=deep-decorator-search.util.mjs.map
//# sourceMappingURL=deep-decorator-search.util.mjs.map