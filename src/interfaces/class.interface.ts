/**
 * Interface representing a class constructor.
 *
 * Provides a rigorous type definition for class constructors with support for
 * constructor arguments, instance type, static type, and abstract status.
 *
 * @template CtorArgs - Constructor argument types
 * @template InstanceType - Instance type
 * @template StaticType - Static type
 * @template IsAbstract - Whether the class is abstract
 */
export interface ClassInterface<
  CtorArgs extends any[] = any[],
  InstanceType = {},
  StaticType = {},
  IsAbstract = false,
> {
  /**
   * Constructor function for the class.
   *
   * @param args - Constructor arguments
   * @returns An instance of the class
   */
  new (...args: CtorArgs): InstanceType
}

/**
 * Use intersection type to combine the interface with StaticType.
 *
 * @template CtorArgs - Constructor argument types
 * @template InstanceType - Instance type
 * @template StaticType - Static type
 * @template IsAbstract - Whether the class is abstract
 */
export type ClassInterfaceWithStatics<
  CtorArgs extends any[] = any[],
  InstanceType = {},
  StaticType = {},
  IsAbstract = false,
> = ClassInterface<CtorArgs, InstanceType, StaticType, IsAbstract> & StaticType
