import type { Class } from '../types/class.type'
import { getDecoratorsForClass } from './get-decorators-for-class.util'

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
export const decorateMember = <T extends PropertyDecorator | MethodDecorator>(decorator: T): T =>
  ((object: Object, key: string | symbol, descriptor?: PropertyDescriptor) => {
    // Determine if the decorator is for a static or instance member
    const decoratorTargetType = typeof object === 'function' ? 'static' : 'instance'

    // Determine if the decorator is for a method or property
    // Use type assertion to allow indexing with string | symbol
    const decoratorType = typeof (object as any)[key] === 'function' ? 'method' : 'property'

    // Get the class being decorated
    // Use type assertion to ensure correct type
    const clazz: Class =
      decoratorTargetType === 'static'
        ? (object as unknown as Class)
        : (object.constructor as Class)

    // Get or create decorators for the class
    const decoratorsForClass = getDecoratorsForClass(clazz)

    // Get or create decorators for the target type (static or instance)
    const decoratorsForTargetType = decoratorsForClass?.[decoratorTargetType] ?? {}
    decoratorsForClass[decoratorTargetType] = decoratorsForTargetType

    // Get or create decorators for the type (method or property)
    const decoratorsForType = decoratorsForTargetType?.[decoratorType] ?? {}
    decoratorsForTargetType[decoratorType] = decoratorsForType as any

    // Convert symbol keys to string representation for storage
    const keyStr = typeof key === 'symbol' ? key.toString() : key

    // Get or create decorators for the key
    const decoratorsForKey = decoratorsForType?.[keyStr] ?? []
    decoratorsForType[keyStr] = decoratorsForKey

    // Add the decorator to the decorators for the key
    decoratorsForKey.push(decorator as any)

    // Apply the decorator to the member
    // Handle both PropertyDecorator and MethodDecorator cases
    if (descriptor !== undefined) {
      // It's a MethodDecorator
      return (decorator as MethodDecorator)(object, key, descriptor)
    } else {
      // It's a PropertyDecorator
      return (decorator as PropertyDecorator)(object, key)
    }
  }) as T
