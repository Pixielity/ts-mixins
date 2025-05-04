import { Class } from '../types/class.type.mjs';

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
declare const Mix: (...ingredients: Class[]) => (decoratedClass: (abstract new (...args: any[]) => {}) & {
    name?: any;
}) => any;

export { Mix };
