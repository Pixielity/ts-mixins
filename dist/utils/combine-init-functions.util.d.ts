/**
 * Combines initialization functions from multiple prototypes into a single function.
 *
 * This function is used internally by the Mixin function to combine initialization functions
 * from all constituent classes into a single function that calls all of them.
 *
 * @param prototypes - The prototypes containing init functions
 * @param initFunctionName - The name of the initialization function
 * @returns An object with the combined init function
 *
 * @internal
 */
declare function combineInitFunctions(prototypes: any[], initFunctionName: string): object

export { combineInitFunctions }
