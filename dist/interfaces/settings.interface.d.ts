/**
 * Interface for TSMixer configuration settings.
 */
interface Settings {
    /**
     * Name of the initialization function to call after mixing.
     * Set to null to disable initialization function calling.
     *
     * @example
     * settings.initFunction = 'init';
     */
    initFunction: string | null;
    /**
     * Strategy for handling static properties.
     * - 'copy': Copy static properties (more performant, ES5 compatible)
     * - 'proxy': Proxy static properties (less performant, but reflects changes to source classes)
     *
     * @example
     * settings.staticsStrategy = 'proxy';
     */
    staticsStrategy: 'copy' | 'proxy';
    /**
     * Strategy for handling prototype properties.
     * - 'copy': Copy prototype properties (more performant, ES5 compatible)
     * - 'proxy': Proxy prototype properties (less performant, but reflects changes to source classes)
     *
     * @example
     * settings.prototypeStrategy = 'proxy';
     */
    prototypeStrategy: 'copy' | 'proxy';
    /**
     * Strategy for inheriting decorators from constituent classes.
     * - 'deep': Inherit decorators from all classes in the prototype chain and mixins
     * - 'direct': Inherit decorators only from direct constituent classes
     * - 'none': Don't inherit decorators
     *
     * @example
     * settings.decoratorInheritance = 'direct';
     */
    decoratorInheritance: 'deep' | 'direct' | 'none';
}

export type { Settings };
