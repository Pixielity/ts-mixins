// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { protoChain };
//# sourceMappingURL=proto-chain.util.mjs.map
//# sourceMappingURL=proto-chain.util.mjs.map