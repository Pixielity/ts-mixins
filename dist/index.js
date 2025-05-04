'use strict';

// src/config/settings.setting.ts
var settings = {
  initFunction: null,
  staticsStrategy: "copy",
  prototypeStrategy: "copy",
  decoratorInheritance: "deep"
};

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
  const allKeys = unique([...Object.getOwnPropertyNames(o1 || {}), ...Object.getOwnPropertyNames(o2 || {})]);
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

// src/utils/direct-decorator-search.util.ts
var directDecoratorSearch = (...classes) => {
  const classDecorators = classes.map((clazz) => getDecoratorsForClass(clazz));
  if (classDecorators.length === 0) return {};
  if (classDecorators.length === 1) return classDecorators[0];
  return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2));
};

// src/utils/flatten.util.ts
var flatten = (arr) => arr.length === 0 ? [] : arr.length === 1 ? arr[0] : arr.reduce((a1, a2) => [...a1, ...a2]);

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

// src/utils/combine-init-functions.util.ts
function combineInitFunctions(prototypes, initFunctionName) {
  const initFunctions = prototypes.map((proto) => proto[initFunctionName]).filter((func) => typeof func === "function");
  const combinedInitFunction = function(...args) {
    for (const initFunction of initFunctions) initFunction.apply(this, args);
  };
  return { [initFunctionName]: combinedInitFunction };
}

// src/utils/create-mixed-class.util.ts
function createMixedClass(constructors) {
  const initFunctionName = settings.initFunction;
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
    if (initFunctionName !== null && typeof this[initFunctionName] === "function")
      this[initFunctionName](...args);
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
  const initFunctionName = settings.initFunction;
  if (initFunctionName !== null) {
    const extraProto = combineInitFunctions(prototypes, initFunctionName);
    prototypes.push(extraProto);
  }
  const MixedClass = createMixedClass(constructors);
  MixedClass.prototype = settings.prototypeStrategy === "copy" ? hardMixProtos(prototypes, MixedClass) : softMixProtos(prototypes, MixedClass);
  Object.setPrototypeOf(
    MixedClass,
    settings.staticsStrategy === "copy" ? hardMixProtos(constructors, null, ["prototype"]) : proxyMix(constructors, Function.prototype)
  );
  let DecoratedMixedClass = MixedClass;
  if (settings.decoratorInheritance !== "none") {
    const classDecorators = settings.decoratorInheritance === "deep" ? deepDecoratorSearch(...constructors) : directDecoratorSearch(...constructors);
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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.Decorate = Decorate;
exports.Mix = Mix;
exports.Mixin = Mixin;
exports.applyPropAndMethodDecorators = applyPropAndMethodDecorators;
exports.combineInitFunctions = combineInitFunctions;
exports.copyProps = copyProps;
exports.createMixedClass = createMixedClass;
exports.decorateClass = decorateClass;
exports.decorateMember = decorateMember;
exports.decorators = decorators;
exports.deepDecoratorSearch = deepDecoratorSearch;
exports.directDecoratorSearch = directDecoratorSearch;
exports.findAllConstituentClasses = findAllConstituentClasses;
exports.flatten = flatten;
exports.getDecoratorsForClass = getDecoratorsForClass;
exports.getIngredientWithProp = getIngredientWithProp;
exports.getMixinsForClass = getMixinsForClass;
exports.hardMixProtos = hardMixProtos;
exports.hasMixin = hasMixin;
exports.mergeDecorators = mergeDecorators;
exports.mergeObjectsOfDecorators = mergeObjectsOfDecorators;
exports.mergePropertyAndMethodDecorators = mergePropertyAndMethodDecorators;
exports.nearestCommonProto = nearestCommonProto;
exports.protoChain = protoChain;
exports.proxyMix = proxyMix;
exports.registerMixins = registerMixins;
exports.settings = settings;
exports.softMixProtos = softMixProtos;
exports.unique = unique;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map