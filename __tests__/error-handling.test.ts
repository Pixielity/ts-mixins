import { Mixin } from '../src/mixin'
import { settings } from '../src/config/settings.setting'

describe('Error Handling', () => {
  // Save original settings
  const originalSettings = { ...settings }

  // Restore settings after tests
  afterEach(() => {
    Object.assign(settings, originalSettings)
  })

  it('should handle errors in constructors', () => {
    class A {
      constructor() {
        throw new Error('Constructor error')
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(() => {
      new AB()
    }).toThrow('Constructor error')
  })

  it('should handle errors in initialization functions', () => {
    settings.initFunction = 'init'

    class A {
      init() {
        throw new Error('Init error')
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(() => {
      new AB()
    }).toThrow('Init error')
  })

  it('should handle type errors properly', () => {
    class A {
      public aMethod(param: string): string {
        return param.toUpperCase()
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(() => {
      // @ts-ignore: TypeScript would catch this, but we're testing runtime behavior
      instance.aMethod(123)
    }).toThrow()
  })

  it('should handle property access errors', () => {
    class A {
      get errorProp(): string {
        throw new Error('Property error')
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(() => {
      const value = instance.errorProp
    }).toThrow('Property error')
  })
})
