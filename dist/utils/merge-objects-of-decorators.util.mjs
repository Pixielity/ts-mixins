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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { mergeObjectsOfDecorators };
//# sourceMappingURL=merge-objects-of-decorators.util.mjs.map
//# sourceMappingURL=merge-objects-of-decorators.util.mjs.map