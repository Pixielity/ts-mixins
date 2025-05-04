/**
 * Returns the longer of the two tuples.
 * Indefinite tuples will always be considered longest.
 *
 * @template T1 - First tuple
 * @template T2 - Second tuple
 * @internal
 */
type _Longest<T1 extends any[], T2 extends any[]> = any[] extends T1 ? T1 : any[] extends T2 ? T2 : Exclude<keyof T1, keyof T2> extends never ? T2 : T1;
/**
 * Returns the longest of up to 10 different tuples.
 *
 * Used for determining the constructor argument types for mixed classes.
 * This type is used internally by the Mixin function to determine the constructor
 * argument types for the mixed class.
 *
 * @template T1 - First tuple
 * @template T2 - Second tuple
 * @template T3 - Third tuple
 * @template T4 - Fourth tuple
 * @template T5 - Fifth tuple
 * @template T6 - Sixth tuple
 * @template T7 - Seventh tuple
 * @template T8 - Eighth tuple
 * @template T9 - Ninth tuple
 * @template T10 - Tenth tuple
 */
type Longest<T1 extends any[], T2 extends any[] = [], T3 extends any[] = [], T4 extends any[] = [], T5 extends any[] = [], T6 extends any[] = [], T7 extends any[] = [], T8 extends any[] = [], T9 extends any[] = [], T10 extends any[] = []> = _Longest<_Longest<_Longest<_Longest<T1, T2>, _Longest<T3, T4>>, _Longest<_Longest<T5, T6>, _Longest<T7, T8>>>, _Longest<T9, T10>>;

export type { Longest, _Longest };
