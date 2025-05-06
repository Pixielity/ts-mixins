/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/unique.util.ts
var unique = (arr) => arr.filter((e, i) => arr.indexOf(e) === i);

// src/utils/merge-objects-of-decorators.util.ts
var mergeObjectsOfDecorators = (o1, o2) => {
  const allKeys = unique([
    ...Object.getOwnPropertyNames(o1 || {}),
    ...Object.getOwnPropertyNames(o2 || {})
  ]);
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

export { mergeDecorators };
//# sourceMappingURL=merge-decorators.util.mjs.map
//# sourceMappingURL=merge-decorators.util.mjs.map