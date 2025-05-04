/**
 * Identifies the nearest ancestor common to all the given objects in their prototype chains.
 *
 * For most unrelated objects, this function should return Object.prototype.
 * This function is used internally by the hardMixProtos function to find the common ancestor
 * of all ingredients.
 *
 * @param objs - The objects to find the common ancestor for
 * @returns The nearest common ancestor, or undefined if no objects were provided
 *
 * @internal
 */
declare const nearestCommonProto: (...objs: object[]) => object | undefined;

export { nearestCommonProto };
