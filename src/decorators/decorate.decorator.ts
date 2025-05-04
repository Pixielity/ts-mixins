import { decorateClass } from '../utils/decorate-class.util'
import { decorateMember } from '../utils/decorate-member.util'

/**
 * Decorator factory that tracks decorators for use with mixins.
 *
 * This function wraps a decorator and tracks it for inheritance in mixed classes.
 * It handles class decorators, property decorators, and method decorators.
 *
 * @template T - Type of decorator (ClassDecorator, PropertyDecorator, or MethodDecorator)
 * @param decorator - Decorator to track
 * @returns Tracked decorator that will be inherited by mixed classes
 *
 * @example
 * // Track a class decorator
 * @Decorate(MyClassDecorator)
 * class MyClass {
 *   // Track a property decorator
 *   @Decorate(MyPropertyDecorator)
 *   myProperty: string;
 *
 *   // Track a method decorator
 *   @Decorate(MyMethodDecorator)
 *   myMethod() {}
 * }
 */
export const Decorate = <T extends ClassDecorator | PropertyDecorator | MethodDecorator>(
  decorator: T,
): T =>
  ((...args: any[]) => {
    // If only one argument, it's a class decorator
    if (args.length === 1) return decorateClass(decorator as ClassDecorator)(args[0])

    // Otherwise, it's a property or method decorator
    return decorateMember(decorator as PropertyDecorator | MethodDecorator)(
      ...(args as [Object, string, TypedPropertyDescriptor<any>]),
    )
  }) as T
