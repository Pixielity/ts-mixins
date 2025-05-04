import { mixins } from './mixins-map.tracking'

/**
 * Registers constituent classes for a mixin class.
 *
 * This function is used internally by the Mixin function to register the constituent classes
 * for a mixin class. This information is used by the hasMixin and getMixinsForClass functions.
 *
 * @param mixedClass - The mixin class
 * @param constituents - The constituent classes
 *
 * @internal
 */
export const registerMixins = (mixedClass: any, constituents: Function[]): void => {
  mixins.set(mixedClass, constituents)
}
