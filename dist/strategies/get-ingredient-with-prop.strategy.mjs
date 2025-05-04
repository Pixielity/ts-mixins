// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};

// src/strategies/get-ingredient-with-prop.strategy.ts
var getIngredientWithProp = (prop, ingredients) => {
  const protoChains = ingredients.map((ingredient) => protoChain(ingredient));
  let protoDepth = 0;
  let protosAreLeftToSearch = true;
  while (protosAreLeftToSearch) {
    protosAreLeftToSearch = false;
    for (let i = ingredients.length - 1; i >= 0; i--) {
      const searchTarget = protoChains[i][protoDepth];
      if (searchTarget !== void 0 && searchTarget !== null) {
        protosAreLeftToSearch = true;
        if (Object.getOwnPropertyDescriptor(searchTarget, prop) != void 0) {
          return protoChains[i][0];
        }
      }
    }
    protoDepth++;
  }
  return void 0;
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { getIngredientWithProp };
//# sourceMappingURL=get-ingredient-with-prop.strategy.mjs.map
//# sourceMappingURL=get-ingredient-with-prop.strategy.mjs.map