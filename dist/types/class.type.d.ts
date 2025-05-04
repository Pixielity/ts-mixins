/**
 * A rigorous type alias for a class.
 *
 * Provides type safety for class constructors with support for
 * constructor arguments, instance type, static type, and abstract status.
 *
 * @template CtorArgs - Constructor argument types
 * @template InstanceType - Instance type
 * @template StaticType - Static type
 * @template IsAbstract - Whether the class is abstract
 */
type Class<
  CtorArgs extends any[] = any[],
  InstanceType = {},
  StaticType = {},
  IsAbstract = false,
> = (abstract new (...args: any[]) => InstanceType) & StaticType

export type { Class }
