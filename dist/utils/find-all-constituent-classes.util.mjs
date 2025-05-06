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

// src/tracking/mixins-map.tracking.ts
var mixins = /* @__PURE__ */ new WeakMap();

// src/tracking/get-mixins-for-class.tracking.ts
var getMixinsForClass = (clazz) => mixins.get(clazz);

// src/utils/find-all-constituent-classes.util.ts
var findAllConstituentClasses = (...classes) => {
  var _a;
  const allClasses = /* @__PURE__ */ new Set();
  const frontier = /* @__PURE__ */ new Set([...classes]);
  while (frontier.size > 0) {
    for (const clazz of frontier) {
      const protoChainClasses = protoChain(clazz.prototype).map((proto) => proto.constructor);
      const mixinClasses = (_a = getMixinsForClass(clazz)) != null ? _a : [];
      const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
      const newClasses = potentiallyNewClasses.filter((c) => !allClasses.has(c));
      for (const newClass of newClasses) frontier.add(newClass);
      allClasses.add(clazz);
      frontier.delete(clazz);
    }
  }
  return [...allClasses];
};

export { findAllConstituentClasses };
//# sourceMappingURL=find-all-constituent-classes.util.mjs.map
//# sourceMappingURL=find-all-constituent-classes.util.mjs.map