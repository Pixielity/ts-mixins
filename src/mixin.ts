import { proxyMix } from './strategies/proxy-mix.strategy'
import { softMixProtos } from './strategies/soft-mix-protos.strategy'
import { hardMixProtos } from './strategies/hard-mix-protos.strategy'
import type { Class, Longest } from './types'
import { settings } from './config/settings.setting'
import { directDecoratorSearch, deepDecoratorSearch, applyPropAndMethodDecorators } from './utils'
import { registerMixins } from './tracking/register-mixins.tracking'
import { createMixedClass } from './utils/create-mixed-class.util'
import { combineInitFunctions } from './utils/combine-init-functions.util'

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * This function combines multiple classes into a single class that inherits
 * properties, methods, and decorators from all constituent classes.
 *
 * @template A - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @param c1 - First class to mix
 * @returns A new class that is a mixture of the given class
 *
 * @example
 * class A {
 *   methodA() { return 'A'; }
 * }
 *
 * const MixedClass = Mixin(A);
 * const instance = new MixedClass();
 * instance.methodA(); // 'A'
 */
function Mixin<A extends any[], I1, S1>(c1: Class<A, I1, S1>): Class<A, I1, S1>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @returns A new class that is a mixture of the given classes
 *
 * @example
 * class A {
 *   methodA() { return 'A'; }
 * }
 *
 * class B {
 *   methodB() { return 'B'; }
 * }
 *
 * const AB = Mixin(A, B);
 * const instance = new AB();
 * instance.methodA(); // 'A'
 * instance.methodB(); // 'B'
 */
function Mixin<A1 extends any[], I1, S1, A2 extends any[], I2, S2>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
): Class<Longest<A1, A2>, I1 & I2, S1 & S2>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<A1 extends any[], I1, S1, A2 extends any[], I2, S2, A3 extends any[], I3, S3>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
): Class<Longest<A1, A2, A3>, I1 & I2 & I3, S1 & S2 & S3>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
): Class<Longest<A1, A2, A3, A4>, I1 & I2 & I3 & I4, S1 & S2 & S3 & S4>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
): Class<Longest<A1, A2, A3, A4, A5>, I1 & I2 & I3 & I4 & I5, S1 & S2 & S3 & S4 & S5>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @template A6 - Constructor argument types for the sixth class
 * @template I6 - Instance type of the sixth class
 * @template S6 - Static type of the sixth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @param c6 - Sixth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
  A6 extends any[],
  I6,
  S6,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
  c6: Class<A6, I6, S6>,
): Class<Longest<A1, A2, A3, A4, A5, A6>, I1 & I2 & I3 & I4 & I5 & I6, S1 & S2 & S3 & S4 & S5 & S6>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @template A6 - Constructor argument types for the sixth class
 * @template I6 - Instance type of the sixth class
 * @template S6 - Static type of the sixth class
 * @template A7 - Constructor argument types for the seventh class
 * @template I7 - Instance type of the seventh class
 * @template S7 - Static type of the seventh class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @param c6 - Sixth class to mix
 * @param c7 - Seventh class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
  A6 extends any[],
  I6,
  S6,
  A7 extends any[],
  I7,
  S7,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
  c6: Class<A6, I6, S6>,
  c7: Class<A7, I7, S7>,
): Class<
  Longest<A1, A2, A3, A4, A5, A6, A7>,
  I1 & I2 & I3 & I4 & I5 & I6 & I7,
  S1 & S2 & S3 & S4 & S5 & S6 & S7
>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @template A6 - Constructor argument types for the sixth class
 * @template I6 - Instance type of the sixth class
 * @template S6 - Static type of the sixth class
 * @template A7 - Constructor argument types for the seventh class
 * @template I7 - Instance type of the seventh class
 * @template S7 - Static type of the seventh class
 * @template A8 - Constructor argument types for the eighth class
 * @template I8 - Instance type of the eighth class
 * @template S8 - Static type of the eighth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @param c6 - Sixth class to mix
 * @param c7 - Seventh class to mix
 * @param c8 - Eighth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
  A6 extends any[],
  I6,
  S6,
  A7 extends any[],
  I7,
  S7,
  A8 extends any[],
  I8,
  S8,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
  c6: Class<A6, I6, S6>,
  c7: Class<A7, I7, S7>,
  c8: Class<A8, I8, S8>,
): Class<
  Longest<A1, A2, A3, A4, A5, A6, A7, A8>,
  I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8,
  S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8
>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @template A6 - Constructor argument types for the sixth class
 * @template I6 - Instance type of the sixth class
 * @template S6 - Static type of the sixth class
 * @template A7 - Constructor argument types for the seventh class
 * @template I7 - Instance type of the seventh class
 * @template S7 - Static type of the seventh class
 * @template A8 - Constructor argument types for the eighth class
 * @template I8 - Instance type of the eighth class
 * @template S8 - Static type of the eighth class
 * @template A9 - Constructor argument types for the ninth class
 * @template I9 - Instance type of the ninth class
 * @template S9 - Static type of the ninth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @param c6 - Sixth class to mix
 * @param c7 - Seventh class to mix
 * @param c8 - Eighth class to mix
 * @param c9 - Ninth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
  A6 extends any[],
  I6,
  S6,
  A7 extends any[],
  I7,
  S7,
  A8 extends any[],
  I8,
  S8,
  A9 extends any[],
  I9,
  S9,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
  c6: Class<A6, I6, S6>,
  c7: Class<A7, I7, S7>,
  c8: Class<A8, I8, S8>,
  c9: Class<A9, I9, S9>,
): Class<
  Longest<A1, A2, A3, A4, A5, A6, A7, A8, A9>,
  I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8 & I9,
  S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9
>

/**
 * Creates a new class that is a mixture of the given classes.
 *
 * @template A1 - Constructor argument types for the first class
 * @template I1 - Instance type of the first class
 * @template S1 - Static type of the first class
 * @template A2 - Constructor argument types for the second class
 * @template I2 - Instance type of the second class
 * @template S2 - Static type of the second class
 * @template A3 - Constructor argument types for the third class
 * @template I3 - Instance type of the third class
 * @template S3 - Static type of the third class
 * @template A4 - Constructor argument types for the fourth class
 * @template I4 - Instance type of the fourth class
 * @template S4 - Static type of the fourth class
 * @template A5 - Constructor argument types for the fifth class
 * @template I5 - Instance type of the fifth class
 * @template S5 - Static type of the fifth class
 * @template A6 - Constructor argument types for the sixth class
 * @template I6 - Instance type of the sixth class
 * @template S6 - Static type of the sixth class
 * @template A7 - Constructor argument types for the seventh class
 * @template I7 - Instance type of the seventh class
 * @template S7 - Static type of the seventh class
 * @template A8 - Constructor argument types for the eighth class
 * @template I8 - Instance type of the eighth class
 * @template S8 - Static type of the eighth class
 * @template A9 - Constructor argument types for the ninth class
 * @template I9 - Instance type of the ninth class
 * @template S9 - Static type of the ninth class
 * @template A10 - Constructor argument types for the tenth class
 * @template I10 - Instance type of the tenth class
 * @template S10 - Static type of the tenth class
 * @param c1 - First class to mix
 * @param c2 - Second class to mix
 * @param c3 - Third class to mix
 * @param c4 - Fourth class to mix
 * @param c5 - Fifth class to mix
 * @param c6 - Sixth class to mix
 * @param c7 - Seventh class to mix
 * @param c8 - Eighth class to mix
 * @param c9 - Ninth class to mix
 * @param c10 - Tenth class to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin<
  A1 extends any[],
  I1,
  S1,
  A2 extends any[],
  I2,
  S2,
  A3 extends any[],
  I3,
  S3,
  A4 extends any[],
  I4,
  S4,
  A5 extends any[],
  I5,
  S5,
  A6 extends any[],
  I6,
  S6,
  A7 extends any[],
  I7,
  S7,
  A8 extends any[],
  I8,
  S8,
  A9 extends any[],
  I9,
  S9,
  A10 extends any[],
  I10,
  S10,
>(
  c1: Class<A1, I1, S1>,
  c2: Class<A2, I2, S2>,
  c3: Class<A3, I3, S3>,
  c4: Class<A4, I4, S4>,
  c5: Class<A5, I5, S5>,
  c6: Class<A6, I6, S6>,
  c7: Class<A7, I7, S7>,
  c8: Class<A8, I8, S8>,
  c9: Class<A9, I9, S9>,
  c10: Class<A10, I10, S10>,
): Class<
  Longest<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>,
  I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8 & I9 & I10,
  S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10
>

/**
 * Implementation of the Mixin function.
 *
 * @param constructors - Classes to mix
 * @returns A new class that is a mixture of the given classes
 */
function Mixin(...constructors: Class[]): Class {
  // Extract prototypes from all constructor classes
  const prototypes = constructors.map((constructor) => constructor.prototype)

  // Handle initialization functions if configured
  const initFunctionName = settings.initFunction
  if (initFunctionName !== null) {
    // Combine initialization functions from all prototypes
    const extraProto = combineInitFunctions(prototypes, initFunctionName)
    prototypes.push(extraProto)
  }

  // Create the mixed class constructor
  const MixedClass = createMixedClass(constructors)

  // Set up the prototype based on the selected strategy
  MixedClass.prototype =
    settings.prototypeStrategy === 'copy'
      ? hardMixProtos(prototypes, MixedClass)
      : softMixProtos(prototypes, MixedClass)

  // Set up the static properties based on the selected strategy
  Object.setPrototypeOf(
    MixedClass,
    settings.staticsStrategy === 'copy'
      ? hardMixProtos(constructors, null, ['prototype'])
      : proxyMix(constructors, Function.prototype),
  )

  let DecoratedMixedClass: any = MixedClass

  // Apply decorators if enabled
  if (settings.decoratorInheritance !== 'none') {
    // Get decorators based on the configured inheritance strategy
    const classDecorators =
      settings.decoratorInheritance === 'deep'
        ? deepDecoratorSearch(...constructors)
        : directDecoratorSearch(...constructors)

    // Apply class decorators
    for (const decorator of classDecorators?.class ?? []) {
      const result = decorator(DecoratedMixedClass)

      if (result) {
        DecoratedMixedClass = result
      }
    }

    // Apply static property and method decorators
    // Pass the mixed class as the target and the original constructors for context
    applyPropAndMethodDecorators(classDecorators?.static ?? {}, DecoratedMixedClass, constructors)

    // Apply instance property and method decorators
    applyPropAndMethodDecorators(classDecorators?.instance ?? {}, DecoratedMixedClass.prototype)
  }

  // Register the mixin for tracking
  registerMixins(DecoratedMixedClass, constructors)

  // Collect all parent classes from the inheritance chains
  const allParentClasses = new Set<any>()
  for (const constructor of constructors) {
    let proto = Object.getPrototypeOf(constructor)
    while (proto && proto !== Function.prototype) {
      allParentClasses.add(proto)
      proto = Object.getPrototypeOf(proto)
    }
  }

  // Modify Symbol.hasInstance for all constructors and their parent classes
  const classesToModify = [...constructors, ...allParentClasses]
  classesToModify.forEach((constructor) => {
    try {
      // Store the original hasInstance method if it exists
      const originalHasInstance = constructor[Symbol.hasInstance]

      // Use Object.defineProperty to modify Symbol.hasInstance
      Object.defineProperty(constructor, Symbol.hasInstance, {
        value: function (instance: any) {
          if (!instance) return false

          // Check if instance is an instance of the mixed class
          if (instance instanceof DecoratedMixedClass) {
            return true
          }

          // Check if instance is directly an instance of this constructor
          if (Object.getPrototypeOf(instance) === this.prototype) {
            return true
          }

          // Fall back to the original behavior if available
          if (originalHasInstance) {
            return originalHasInstance.call(this, instance)
          }

          // Default behavior
          return Object.prototype.isPrototypeOf.call(this.prototype, instance)
        },
        configurable: true,
      })
    } catch (error) {
      // If we can't modify Symbol.hasInstance, just continue
      console.warn(`Could not modify Symbol.hasInstance for ${constructor.name}:`, error)
    }
  })

  // Make the mixed class recognize all constituent classes in instanceof checks
  Object.defineProperty(DecoratedMixedClass, Symbol.hasInstance, {
    value: function (instance: any) {
      if (!instance) return false

      // Check if instance is directly an instance of this class
      if (Object.getPrototypeOf(instance) === this.prototype) {
        return true
      }

      // Check if instance is an instance of any constituent class
      for (const constructor of constructors) {
        try {
          // Use the original instanceof behavior
          if (instance instanceof constructor) {
            return true
          }
        } catch (e) {
          // If instanceof check fails, try a more direct approach
          if (Object.prototype.isPrototypeOf.call(constructor.prototype, instance)) {
            return true
          }
        }
      }

      return false
    },
    configurable: true,
  })

  return DecoratedMixedClass
}

export { Mixin }
