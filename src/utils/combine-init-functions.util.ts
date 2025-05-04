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
export function combineInitFunctions(prototypes: any[], initFunctionName: string): object {
  // Extract all initialization functions from the prototypes
  const initFunctions: Function[] = prototypes
    .map((proto) => proto[initFunctionName])
    .filter((func) => typeof func === 'function')

  // Create a combined initialization function that calls all individual init functions
  const combinedInitFunction = function (this: any, ...args: any[]): void {
    for (const initFunction of initFunctions) initFunction.apply(this, args)
  }

  // Return an object with the combined init function
  return { [initFunctionName]: combinedInitFunction }
}
