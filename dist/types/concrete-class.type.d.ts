import { ClassInterfaceWithStatics } from '../interfaces/class.interface.js';

/**
 * Type for a concrete (non-abstract) class.
 *
 * @template CtorArgs - Constructor argument types
 * @template InstanceType - Instance type
 * @template StaticType - Static type
 */
type ConcreteClass<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}> = ClassInterfaceWithStatics<CtorArgs, InstanceType, StaticType>;

export type { ConcreteClass };
