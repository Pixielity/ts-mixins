/**
 * Checks if an instance has a mixin in its prototype chain.
 *
 * This function checks if an instance is an instance of a mixin class or has a mixin class
 * in its prototype chain. It also checks for mixins of mixins.
 *
 * @template M - Type of the mixin
 * @param instance - The instance to check
 * @param mixin - The mixin class to check for
 * @returns True if the instance has the mixin, false otherwise
 *
 * @example
 * ```typescript
 * const AB = Mixin(A, B);
 * const instance = new AB();
 *
 * if (hasMixin(instance, A)) {
 *   // instance has A
 * }
 * ```
 */
declare const hasMixin: <M>(
  instance: any,
  mixin: abstract new (...args: any[]) => M,
) => instance is M

export { hasMixin }
