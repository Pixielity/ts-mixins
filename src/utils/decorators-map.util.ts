import type { Class } from '../types/class.type'
import type { Decorators } from '../interfaces/decorators.interface'

/**
 * Map to store decorators for classes.
 *
 * This map is used internally by the Decorate function to track decorators for inheritance in mixed classes.
 *
 * @internal
 */
export const decorators: Map<Class, Decorators> = new Map()
