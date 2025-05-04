/**
 * Keeps track of constituent classes for every mixin class created by ts-mixer.
 * Uses a WeakMap to avoid memory leaks.
 *
 * @internal
 */
export const mixins = new WeakMap<any, Function[]>()
