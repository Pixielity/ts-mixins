import { ObjectOfDecorators } from '../interfaces/object-of-decorators.interface.mjs';

/**
 * Merges two objects of decorators into one.
 *
 * This function is used internally by the mergePropertyAndMethodDecorators function to merge
 * property or method decorators from multiple classes.
 *
 * @template T - Type of decorator (PropertyDecorator or MethodDecorator)
 * @param o1 - First object of decorators
 * @param o2 - Second object of decorators
 * @returns Merged object of decorators
 *
 * @internal
 */
declare const mergeObjectsOfDecorators: <T extends PropertyDecorator | MethodDecorator>(o1: ObjectOfDecorators<T>, o2: ObjectOfDecorators<T>) => ObjectOfDecorators<T>;

export { mergeObjectsOfDecorators };
