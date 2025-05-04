import type { Settings } from '../interfaces/settings.interface'

/**
 * Default configuration settings for TS Mixins.
 *
 * @property {string | null} initFunction - Name of the initialization function to call after mixing.
 *   Set to null to disable initialization function calling.
 *
 * @property {string} staticsStrategy - Strategy for handling static properties.
 *   - 'copy': Copy static properties (more performant, ES5 compatible)
 *   - 'proxy': Proxy static properties (less performant, but reflects changes to source classes)
 *
 * @property {string} prototypeStrategy - Strategy for handling prototype properties.
 *   - 'copy': Copy prototype properties (more performant, ES5 compatible)
 *   - 'proxy': Proxy prototype properties (less performant, but reflects changes to source classes)
 *
 * @property {string} decoratorInheritance - Strategy for inheriting decorators from constituent classes.
 *   - 'deep': Inherit decorators from all classes in the prototype chain and mixins
 *   - 'direct': Inherit decorators only from direct constituent classes
 *   - 'none': Don't inherit decorators
 *
 * @example
 * import { settings } from 'ts-mixins';
 *
 * // Configure initialization function
 * settings.initFunction = 'init';
 *
 * // Configure prototype strategy
 * settings.prototypeStrategy = 'proxy';
 */
export const settings: Settings = {
  initFunction: null,
  staticsStrategy: 'copy',
  prototypeStrategy: 'copy',
  decoratorInheritance: 'deep',
}
