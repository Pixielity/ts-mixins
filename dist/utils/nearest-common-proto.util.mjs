// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};

// src/utils/nearest-common-proto.util.ts
var nearestCommonProto = (...objs) => {
  if (objs.length === 0) return void 0;
  let commonProto = void 0;
  const protoChains = objs.map((obj) => protoChain(obj));
  while (protoChains.every((protoChain2) => protoChain2.length > 0)) {
    const protos = protoChains.map((protoChain2) => protoChain2.pop());
    const potentialCommonProto = protos[0];
    if (protos.every((proto) => proto === potentialCommonProto)) commonProto = potentialCommonProto;
    else break;
  }
  return commonProto;
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { nearestCommonProto };
//# sourceMappingURL=nearest-common-proto.util.mjs.map
//# sourceMappingURL=nearest-common-proto.util.mjs.map