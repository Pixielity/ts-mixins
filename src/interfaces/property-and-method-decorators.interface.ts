import type { ObjectOfDecorators } from './object-of-decorators.interface'

/**
 * Interface for property and method decorators organized by type.
 *
 * @property {ObjectOfDecorators<PropertyDecorator>} [property] - Property decorators
 * @property {ObjectOfDecorators<MethodDecorator>} [method] - Method decorators
 */
export interface PropertyAndMethodDecorators {
  /**
   * Property decorators organized by property name.
   */
  property?: ObjectOfDecorators<PropertyDecorator>

  /**
   * Method decorators organized by method name.
   */
  method?: ObjectOfDecorators<MethodDecorator>
}
