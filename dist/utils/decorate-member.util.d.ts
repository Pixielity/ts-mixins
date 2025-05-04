/**
 * Decorates a class member with a property or method decorator.
 *
 * This function is used internally by the Decorate function to track property and method decorators
 * for inheritance in mixed classes.
 *
 * @template T - Type of decorator (PropertyDecorator or MethodDecorator)
 * @param decorator - Property or method decorator to apply
 * @returns Decorated property or method decorator
 *
 * @internal
 */
declare const decorateMember: <T extends PropertyDecorator | MethodDecorator>(decorator: T) => T

export { decorateMember }
