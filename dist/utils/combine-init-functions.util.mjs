/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/combine-init-functions.util.ts
function combineInitFunctions(prototypes, initFunctionName) {
  const initFunctions = prototypes.map((proto) => proto[initFunctionName]).filter((func) => typeof func === "function");
  const combinedInitFunction = function(...args) {
    for (const initFunction of initFunctions) initFunction.apply(this, args);
  };
  return { [initFunctionName]: combinedInitFunction };
}

export { combineInitFunctions };
//# sourceMappingURL=combine-init-functions.util.mjs.map
//# sourceMappingURL=combine-init-functions.util.mjs.map