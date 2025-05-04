'use strict';

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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.mergePropertyAndMethodDecorators = mergePropertyAndMethodDecorators;
//# sourceMappingURL=merge-property-and-method-decorators.util.js.map
//# sourceMappingURL=merge-property-and-method-decorators.util.js.map