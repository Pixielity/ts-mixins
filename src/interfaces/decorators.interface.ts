import type { PropertyAndMethodDecorators } from './property-and-method-decorators.interface'

/**
 * Interface for all types of decorators organized by target.
 *
 * @property {ClassDecorator[]} [class] - Class decorators
 * @property {PropertyAndMethodDecorators} [static] - Static property and method decorators
 * @property {PropertyAndMethodDecorators} [instance] - Instance property and method decorators
 */
export interface Decorators {
  /**
   * Class decorators.
   */
  class?: ClassDecorator[]

  /**
   * Static property and method decorators.
   */
  static?: PropertyAndMethodDecorators

  /**
   * Instance property and method decorators.
   */
  instance?: PropertyAndMethodDecorators
}
