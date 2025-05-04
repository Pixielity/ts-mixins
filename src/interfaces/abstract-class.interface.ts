/**
 * Interface for a potentially abstract class constructor.
 *
 * @template CtorArgs - Constructor argument types
 * @template Instance - Instance type
 * @template Static - Static type
 */
export interface AbstractClassInterface<
  CtorArgs extends any[] = any[],
  Instance = {},
  Static = {},
> {
  /**
   * Constructor function for the class.
   *
   * @param args - Constructor arguments
   * @returns An instance of the class
   */
  new (...args: CtorArgs): Instance
}

/**
 * Combines the instance and static types into one type.
 *
 * @template CtorArgs - Constructor argument types
 * @template Instance - Instance type
 * @template Static - Static type
 */
export type AbstractClassInterfaceWithStatics<
  CtorArgs extends any[] = any[],
  Instance = {},
  Static = {},
> = AbstractClassInterface<CtorArgs, Instance> & Static
