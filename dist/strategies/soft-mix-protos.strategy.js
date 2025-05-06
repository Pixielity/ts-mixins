'use strict';

/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


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

// src/strategies/proxy-mix.strategy.ts
var proxyMix = (ingredients, prototype = Object.prototype) => new Proxy(
  {},
  {
    /**
     * Returns the prototype of the mixed object.
     */
    getPrototypeOf() {
      return prototype;
    },
    /**
     * Prevents setting the prototype of the mixed object.
     */
    setPrototypeOf() {
      throw Error("Cannot set prototype of Proxies created by ts-mixer");
    },
    /**
     * Returns the property descriptor for a property from the appropriate ingredient.
     */
    getOwnPropertyDescriptor(_, prop) {
      return Object.getOwnPropertyDescriptor(getIngredientWithProp(prop, ingredients) || {}, prop);
    },
    /**
     * Prevents defining new properties on the mixed object.
     */
    defineProperty() {
      throw new Error("Cannot define new properties on Proxies created by ts-mixer");
    },
    /**
     * Checks if a property exists on any ingredient or the prototype.
     */
    has(_, prop) {
      return getIngredientWithProp(prop, ingredients) !== void 0 || prototype[prop] !== void 0;
    },
    /**
     * Gets a property from the appropriate ingredient or the prototype.
     */
    get(_, prop) {
      const ingredient = getIngredientWithProp(prop, ingredients);
      if (ingredient !== void 0) {
        return ingredient[prop];
      }
      return prototype[prop];
    },
    /**
     * Sets a property on the appropriate ingredient.
     */
    set(_, prop, val) {
      const ingredientWithProp = getIngredientWithProp(prop, ingredients);
      if (ingredientWithProp === void 0)
        throw new Error("Cannot set new properties on Proxies created by ts-mixer");
      ingredientWithProp[prop] = val;
      return true;
    },
    /**
     * Prevents deleting properties from the mixed object.
     */
    deleteProperty() {
      throw new Error("Cannot delete properties on Proxies created by ts-mixer");
    },
    /**
     * Returns all own property names from all ingredients.
     */
    ownKeys() {
      return ingredients.map(Object.getOwnPropertyNames).reduce((prev, curr) => curr.concat(prev.filter((key) => curr.indexOf(key) < 0)));
    }
  }
);

// src/strategies/soft-mix-protos.strategy.ts
var softMixProtos = (ingredients, constructor) => proxyMix([...ingredients, { constructor }]);

exports.softMixProtos = softMixProtos;
//# sourceMappingURL=soft-mix-protos.strategy.js.map
//# sourceMappingURL=soft-mix-protos.strategy.js.map