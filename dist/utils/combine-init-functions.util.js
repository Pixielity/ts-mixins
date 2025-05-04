'use strict';

// src/utils/combine-init-functions.util.ts
function combineInitFunctions(prototypes, initFunctionName) {
  const initFunctions = prototypes.map((proto) => proto[initFunctionName]).filter((func) => typeof func === "function");
  const combinedInitFunction = function(...args) {
    for (const initFunction of initFunctions) initFunction.apply(this, args);
  };
  return { [initFunctionName]: combinedInitFunction };
}
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.combineInitFunctions = combineInitFunctions;
//# sourceMappingURL=combine-init-functions.util.js.map
//# sourceMappingURL=combine-init-functions.util.js.map