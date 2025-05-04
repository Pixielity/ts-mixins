/**
 * Interface for an object containing arrays of decorators mapped by property name.
 *
 * @template T - Type of decorator (PropertyDecorator or MethodDecorator)
 * @property {T[]} [key] - Array of decorators for a property
 */
interface ObjectOfDecorators<T extends PropertyDecorator | MethodDecorator> {
    /**
     * Array of decorators for a property.
     */
    [key: string]: T[];
}

export type { ObjectOfDecorators };
