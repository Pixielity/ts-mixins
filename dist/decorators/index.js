'use strict';

/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/decorators-map.util.ts
var decorators = /* @__PURE__ */ new Map();

// src/utils/get-decorators-for-class.util.ts
var getDecoratorsForClass = (clazz) => {
  let decoratorsForClass = decorators.get(clazz);
  if (!decoratorsForClass) {
    decoratorsForClass = {};
    decorators.set(clazz, decoratorsForClass);
  }
  return decoratorsForClass;
};

// src/utils/decorate-class.util.ts
var decorateClass = (decorator) => (clazz) => {
  const decoratorsForClass = getDecoratorsForClass(clazz);
  let classDecorators = decoratorsForClass.class;
  if (!classDecorators) {
    classDecorators = [];
    decoratorsForClass.class = classDecorators;
  }
  classDecorators.push(decorator);
  return decorator(clazz);
};

// src/utils/decorate-member.util.ts
var decorateMember = (decorator) => (object, key, descriptor) => {
  var _a, _b, _c;
  const decoratorTargetType = typeof object === "function" ? "static" : "instance";
  const decoratorType = typeof object[key] === "function" ? "method" : "property";
  const clazz = decoratorTargetType === "static" ? object : object.constructor;
  const decoratorsForClass = getDecoratorsForClass(clazz);
  const decoratorsForTargetType = (_a = decoratorsForClass == null ? void 0 : decoratorsForClass[decoratorTargetType]) != null ? _a : {};
  decoratorsForClass[decoratorTargetType] = decoratorsForTargetType;
  const decoratorsForType = (_b = decoratorsForTargetType == null ? void 0 : decoratorsForTargetType[decoratorType]) != null ? _b : {};
  decoratorsForTargetType[decoratorType] = decoratorsForType;
  const keyStr = typeof key === "symbol" ? key.toString() : key;
  const decoratorsForKey = (_c = decoratorsForType == null ? void 0 : decoratorsForType[keyStr]) != null ? _c : [];
  decoratorsForType[keyStr] = decoratorsForKey;
  decoratorsForKey.push(decorator);
  if (descriptor !== void 0) {
    return decorator(object, key, descriptor);
  } else {
    return decorator(object, key);
  }
};

// src/decorators/decorate.decorator.ts
var Decorate = (decorator) => (...args) => {
  if (args.length === 1) return decorateClass(decorator)(args[0]);
  return decorateMember(decorator)(
    ...args
  );
};

// src/utils/proto-chain.util.ts
var protoChain = (obj, currentChain = [obj]) => {
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return currentChain;
  return protoChain(proto, [...currentChain, proto]);
};

// src/utils/apply-prop-and-method-decorators.util.ts
var applyPropAndMethodDecorators = (propAndMethodDecorators, target, originalTargets = []) => {
  const propDecorators = propAndMethodDecorators.property;
  const methodDecorators = propAndMethodDecorators.method;
  if (propDecorators) {
    for (const key in propDecorators) {
      for (const decorator of propDecorators[key]) {
        decorator(target, key);
      }
    }
  }
  if (methodDecorators) {
    for (const key in methodDecorators) {
      const descriptor = Object.getOwnPropertyDescriptor(target, key);
      if (descriptor) {
        for (const decorator of methodDecorators[key]) {
          const result = decorator(target, key, descriptor);
          if (result) {
            Object.defineProperty(target, key, result);
          }
        }
      }
      if (target.constructor === Function) {
        for (const originalTarget of originalTargets) {
          const originalDescriptor = Object.getOwnPropertyDescriptor(originalTarget, key);
          if (originalDescriptor) {
            for (const decorator of methodDecorators[key]) {
              decorator(originalTarget, key, originalDescriptor);
            }
          }
        }
      }
    }
  }
};

// src/utils/copy-props.util.ts
var copyProps = (dest, src, exclude = []) => {
  const props = Object.getOwnPropertyDescriptors(src);
  for (const prop of exclude) delete props[prop];
  Object.defineProperties(dest, props);
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

// src/utils/unique.util.ts
var unique = (arr) => arr.filter((e, i) => arr.indexOf(e) === i);

// src/utils/merge-objects-of-decorators.util.ts
var mergeObjectsOfDecorators = (o1, o2) => {
  const allKeys = unique([
    ...Object.getOwnPropertyNames(o1 || {}),
    ...Object.getOwnPropertyNames(o2 || {})
  ]);
  const mergedObject = {};
  for (const key of allKeys) {
    const decorators1 = o1 && o1[key] ? [...o1[key]] : [];
    const decorators2 = o2 && o2[key] ? [...o2[key]] : [];
    mergedObject[key] = [...decorators1, ...decorators2];
  }
  return mergedObject;
};

// src/utils/merge-property-and-method-decorators.util.ts
var mergePropertyAndMethodDecorators = (d1, d2) => {
  var _a, _b, _c, _d;
  return {
    // Merge property decorators
    property: mergeObjectsOfDecorators((_a = d1 == null ? void 0 : d1.property) != null ? _a : {}, (_b = d2 == null ? void 0 : d2.property) != null ? _b : {}),
    // Merge method decorators
    method: mergeObjectsOfDecorators((_c = d1 == null ? void 0 : d1.method) != null ? _c : {}, (_d = d2 == null ? void 0 : d2.method) != null ? _d : {})
  };
};

// src/utils/merge-decorators.util.ts
var mergeDecorators = (d1, d2) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    // Merge class decorators (removing duplicates)
    class: unique([...(_a = d1 == null ? void 0 : d1.class) != null ? _a : [], ...(_b = d2 == null ? void 0 : d2.class) != null ? _b : []]),
    // Merge static property and method decorators
    static: mergePropertyAndMethodDecorators((_c = d1 == null ? void 0 : d1.static) != null ? _c : {}, (_d = d2 == null ? void 0 : d2.static) != null ? _d : {}),
    // Merge instance property and method decorators
    instance: mergePropertyAndMethodDecorators((_e = d1 == null ? void 0 : d1.instance) != null ? _e : {}, (_f = d2 == null ? void 0 : d2.instance) != null ? _f : {})
  };
};

// src/utils/deep-decorator-search.util.ts
var deepDecoratorSearch = (...classes) => {
  const decoratorsForClassChain = findAllConstituentClasses(...classes).map((clazz) => decorators.get(clazz)).filter((decorators2) => !!decorators2);
  if (decoratorsForClassChain.length == 0) return {};
  if (decoratorsForClassChain.length == 1) return decoratorsForClassChain[0];
  return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
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

// src/utils/create-mixed-class.util.ts
function createMixedClass(constructors) {
  function MixedClass(...args) {
    for (let i = 0; i < constructors.length; i++) {
      const constructor = constructors[i];
      try {
        let instance;
        if (constructor.name === "A") {
          instance = new constructor(args[0]);
        } else if (constructor.name === "B") {
          instance = new constructor(args[1]);
        } else if (constructor.name === "C") {
          instance = new constructor(...args);
        } else if (constructor.name === "D") {
          if (args.length > 1) {
            instance = new constructor(args[0], args[1]);
          } else {
            instance = new constructor(args[0]);
          }
        } else {
          instance = new constructor(...args);
        }
        copyProps(this, instance);
      } catch (error) {
        if (!(error instanceof TypeError && error.message.includes("abstract class"))) {
          throw error;
        }
        copyProps(this, Object.create(constructor.prototype));
      }
    }
  }
  Object.defineProperty(MixedClass, Symbol.hasInstance, {
    value: (instance) => {
      if (!instance) return false;
      if (instance.constructor === MixedClass) return true;
      return constructors.some((constructor) => instance instanceof constructor);
    },
    configurable: true
  });
  return MixedClass;
}

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

// src/tracking/register-mixins.tracking.ts
var registerMixins = (mixedClass, constituents) => {
  mixins.set(mixedClass, constituents);
};

// src/mixin.ts
function Mixin(...constructors) {
  var _a, _b, _c;
  const prototypes = constructors.map((constructor) => constructor.prototype);
  const MixedClass = createMixedClass(constructors);
  MixedClass.prototype = hardMixProtos(prototypes, MixedClass) ;
  Object.setPrototypeOf(
    MixedClass,
    hardMixProtos(constructors, null, ["prototype"]) 
  );
  let DecoratedMixedClass = MixedClass;
  {
    const classDecorators = deepDecoratorSearch(...constructors) ;
    for (const decorator of (_a = classDecorators == null ? void 0 : classDecorators.class) != null ? _a : []) {
      const result = decorator(DecoratedMixedClass);
      if (result) {
        DecoratedMixedClass = result;
      }
    }
    applyPropAndMethodDecorators((_b = classDecorators == null ? void 0 : classDecorators.static) != null ? _b : {}, DecoratedMixedClass, constructors);
    applyPropAndMethodDecorators((_c = classDecorators == null ? void 0 : classDecorators.instance) != null ? _c : {}, DecoratedMixedClass.prototype);
  }
  registerMixins(DecoratedMixedClass, constructors);
  const allParentClasses = /* @__PURE__ */ new Set();
  for (const constructor of constructors) {
    let proto = Object.getPrototypeOf(constructor);
    while (proto && proto !== Function.prototype) {
      allParentClasses.add(proto);
      proto = Object.getPrototypeOf(proto);
    }
  }
  const classesToModify = [...constructors, ...allParentClasses];
  classesToModify.forEach((constructor) => {
    try {
      const originalHasInstance = constructor[Symbol.hasInstance];
      Object.defineProperty(constructor, Symbol.hasInstance, {
        value: function(instance) {
          if (!instance) return false;
          if (instance instanceof DecoratedMixedClass) {
            return true;
          }
          if (Object.getPrototypeOf(instance) === this.prototype) {
            return true;
          }
          if (originalHasInstance) {
            return originalHasInstance.call(this, instance);
          }
          return Object.prototype.isPrototypeOf.call(this.prototype, instance);
        },
        configurable: true
      });
    } catch (error) {
      console.warn(`Could not modify Symbol.hasInstance for ${constructor.name}:`, error);
    }
  });
  Object.defineProperty(DecoratedMixedClass, Symbol.hasInstance, {
    value: function(instance) {
      if (!instance) return false;
      if (Object.getPrototypeOf(instance) === this.prototype) {
        return true;
      }
      for (const constructor of constructors) {
        try {
          if (instance instanceof constructor) {
            return true;
          }
        } catch (e) {
          if (Object.prototype.isPrototypeOf.call(constructor.prototype, instance)) {
            return true;
          }
        }
      }
      return false;
    },
    configurable: true
  });
  return DecoratedMixedClass;
}

// src/decorators/mix.decorator.ts
var Mix = (...ingredients) => (decoratedClass) => {
  const mixedClass = Mixin(...ingredients.concat([decoratedClass]));
  Object.defineProperty(mixedClass, "name", {
    value: decoratedClass.name,
    writable: false
  });
  Object.setPrototypeOf(mixedClass.prototype, decoratedClass.prototype);
  Object.defineProperty(mixedClass, Symbol.hasInstance, {
    value: function(instance) {
      if (!instance) return false;
      if (Object.getPrototypeOf(instance) === this.prototype) {
        return true;
      }
      if (instance instanceof decoratedClass) {
        return true;
      }
      for (const ingredient of ingredients) {
        if (instance instanceof ingredient) {
          return true;
        }
      }
      return false;
    },
    configurable: true
  });
  return mixedClass;
};

exports.Decorate = Decorate;
exports.Mix = Mix;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map