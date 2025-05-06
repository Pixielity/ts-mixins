/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/copy-props.util.ts
var copyProps = (dest, src, exclude = []) => {
  const props = Object.getOwnPropertyDescriptors(src);
  for (const prop of exclude) delete props[prop];
  Object.defineProperties(dest, props);
};

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

// src/strategies/hard-mix-protos.strategy.ts
var hardMixProtos = (ingredients, constructor, exclude = []) => {
  var _a;
  const base = (_a = nearestCommonProto(...ingredients)) != null ? _a : Object.prototype;
  const mixedProto = Object.create(base);
  const visitedProtos = protoChain(base);
  for (const prototype of ingredients) {
    const protos = protoChain(prototype);
    for (let i = protos.length - 1; i >= 0; i--) {
      const newProto = protos[i];
      if (visitedProtos.indexOf(newProto) === -1) {
        copyProps(mixedProto, newProto, ["constructor", ...exclude]);
        visitedProtos.push(newProto);
      }
    }
  }
  if (constructor !== null) {
    mixedProto.constructor = constructor;
  }
  return mixedProto;
};

export { hardMixProtos };
//# sourceMappingURL=hard-mix-protos.strategy.mjs.map
//# sourceMappingURL=hard-mix-protos.strategy.mjs.map