'use strict';

// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.protoChain = protoChain;
//# sourceMappingURL=proto-chain.util.js.map
//# sourceMappingURL=proto-chain.util.js.map