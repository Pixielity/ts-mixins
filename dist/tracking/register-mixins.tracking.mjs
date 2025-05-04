// src/tracking/mixins-map.tracking.ts
var mixins = /* @__PURE__ */ new WeakMap();

// src/tracking/register-mixins.tracking.ts
var registerMixins = (mixedClass, constituents) => {
  mixins.set(mixedClass, constituents);
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { registerMixins };
//# sourceMappingURL=register-mixins.tracking.mjs.map
//# sourceMappingURL=register-mixins.tracking.mjs.map