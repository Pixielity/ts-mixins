'use strict';

/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/tracking/mixins-map.tracking.ts
var mixins = /* @__PURE__ */ new WeakMap();

// src/tracking/get-mixins-for-class.tracking.ts
var getMixinsForClass = (clazz) => mixins.get(clazz);

// src/tracking/has-mixin.tracking.ts
var hasMixin = (instance, mixin) => {
  if (!instance) return false;
  if (instance instanceof mixin) return true;
  const constructor = instance == null ? void 0 : instance.constructor;
  if (!constructor) return false;
  const visited = /* @__PURE__ */ new Set();
  let frontier = /* @__PURE__ */ new Set();
  frontier.add(constructor);
  while (frontier.size > 0) {
    if (frontier.has(mixin)) return true;
    frontier.forEach((item) => visited.add(item));
    const newFrontier = /* @__PURE__ */ new Set();
    frontier.forEach((item) => {
      var _a, _b;
      const itemPrototype = Object.getPrototypeOf(item.prototype);
      const itemConstituents = ((_b = (_a = item.mixins) != null ? _a : mixins.get(item)) != null ? _b : itemPrototype && itemPrototype.constructor && itemPrototype.constructor !== Object) ? [itemPrototype.constructor] : [];
      if (itemConstituents) {
        itemConstituents.forEach((constituent) => {
          if (constituent && !visited.has(constituent) && !frontier.has(constituent)) {
            newFrontier.add(constituent);
          }
        });
      }
    });
    frontier = newFrontier;
  }
  return false;
};

// src/tracking/register-mixins.tracking.ts
var registerMixins = (mixedClass, constituents) => {
  mixins.set(mixedClass, constituents);
};

exports.getMixinsForClass = getMixinsForClass;
exports.hasMixin = hasMixin;
exports.registerMixins = registerMixins;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map