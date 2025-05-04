/**
 * Decorates a class with a class decorator.
 *
 * This function is used internally by the Decorate function to track class decorators
 * for inheritance in mixed classes.
 *
 * @template T - Type of class decorator
 * @param decorator - Class decorator to apply
 * @returns Decorated class decorator
 *
 * @internal
 */
declare const decorateClass: <T extends ClassDecorator>(decorator: T) => T;

export { decorateClass };
