// src/utils/flatten.util.ts
var flatten = (arr) => arr.length === 0 ? [] : arr.length === 1 ? arr[0] : arr.reduce((a1, a2) => [...a1, ...a2]);
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { flatten };
//# sourceMappingURL=flatten.util.mjs.map
//# sourceMappingURL=flatten.util.mjs.map