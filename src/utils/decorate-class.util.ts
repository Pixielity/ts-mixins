import type { Class } from '../types/class.type'
import { getDecoratorsForClass } from './get-decorators-for-class.util'

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
export const decorateClass = <T extends ClassDecorator>(decorator: T): T =>
  ((clazz: Class) => {
    // Get or create decorators for the class
    const decoratorsForClass = getDecoratorsForClass(clazz)

    // Get or create class decorators array
    let classDecorators = decoratorsForClass.class
    if (!classDecorators) {
      classDecorators = []
      decoratorsForClass.class = classDecorators
    }

    // Add the decorator to the class decorators array
    classDecorators.push(decorator)

    // Apply the decorator to the class
    return decorator(clazz)
  }) as T
