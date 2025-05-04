import { Mixin } from '../mixin'
import type { Class } from '../types/class.type'

/**
 * A decorator version of the `Mixin` function.
 *
 * This decorator allows you to mix classes into a decorated class.
 * It's particularly useful for mixing generic classes.
 *
 * @param ingredients - Classes to mix
 * @returns A decorator that mixes the given classes with the decorated class
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
 * @Mix(A, B)
 * class C {
 *   methodC() { return 'C'; }
 * }
 *
 * const instance = new C();
 * instance.methodA(); // 'A'
 * instance.methodB(); // 'B'
 * instance.methodC(); // 'C'
 */
export const Mix =
  (...ingredients: Class[]) =>
  (decoratedClass: (abstract new (...args: any[]) => {}) & { name?: any }) => {
    // Mix the ingredients with the decorated class
    // @ts-ignore: TypeScript doesn't understand the concat operation here
    const mixedClass = Mixin(...ingredients.concat([decoratedClass]))

    // Preserve the name of the decorated class
    Object.defineProperty(mixedClass, 'name', {
      value: decoratedClass.name,
      writable: false,
    })

    // Ensure the mixed class inherits from the decorated class
    Object.setPrototypeOf(mixedClass.prototype, decoratedClass.prototype)

    // Ensure instanceof works correctly
    Object.defineProperty(mixedClass, Symbol.hasInstance, {
      value: function (instance: any) {
        if (!instance) return false

        // Check if instance is directly an instance of this class
        if (Object.getPrototypeOf(instance) === this.prototype) {
          return true
        }

        // Check if instance is an instance of the decorated class
        if (instance instanceof decoratedClass) {
          return true
        }

        // Check if instance is an instance of any ingredient
        for (const ingredient of ingredients) {
          if (instance instanceof ingredient) {
            return true
          }
        }

        return false
      },
      configurable: true,
    })

    return mixedClass as any
  }
