import { Mixin } from '../src/mixin'
import { settings } from '../src/config/settings.setting'

describe('Static Members', () => {
  // Save original settings
  const originalSettings = { ...settings }

  // Restore settings after tests
  afterEach(() => {
    Object.assign(settings, originalSettings)
  })

  it('should inherit static properties with copy strategy', () => {
    settings.staticsStrategy = 'copy'

    class A {
      static staticA = 'A'
    }

    class B {
      static staticB = 'B'
    }

    const AB = Mixin(A, B)

    expect(AB.staticA).toBe('A')
    expect(AB.staticB).toBe('B')
  })

  it('should inherit static methods with copy strategy', () => {
    settings.staticsStrategy = 'copy'

    class A {
      static getStaticA(): string {
        return 'A'
      }
    }

    class B {
      static getStaticB(): string {
        return 'B'
      }
    }

    const AB = Mixin(A, B)

    expect(AB.getStaticA()).toBe('A')
    expect(AB.getStaticB()).toBe('B')
  })

  it("should use the last class's implementation for duplicate static methods with copy strategy", () => {
    settings.staticsStrategy = 'copy'

    class A {
      static getStatic(): string {
        return 'A'
      }
    }

    class B {
      static getStatic(): string {
        return 'B'
      }
    }

    const AB = Mixin(A, B)
    expect(AB.getStatic()).toBe('B')

    const BA = Mixin(B, A)
    expect(BA.getStatic()).toBe('A')
  })

  it('should inherit static properties with proxy strategy', () => {
    settings.staticsStrategy = 'proxy'

    class A {
      static staticA = 'A'
    }

    class B {
      static staticB = 'B'
    }

    const AB = Mixin(A, B)

    expect(AB.staticA).toBe('A')
    expect(AB.staticB).toBe('B')
  })

  it('should reflect changes to source class static properties with proxy strategy', () => {
    settings.staticsStrategy = 'proxy'

    class A {
      static staticA = 'A'
    }

    class B {
      static staticB = 'B'
    }

    const AB = Mixin(A, B)

    expect(AB.staticA).toBe('A')

    // Change the static property on the source class
    A.staticA = 'Modified A'

    // The mixed class should reflect the change with proxy strategy
    expect(AB.staticA).toBe('Modified A')
  })

  it('should not reflect changes to source class static properties with copy strategy', () => {
    settings.staticsStrategy = 'copy'

    class A {
      static staticA = 'A'
    }

    class B {
      static staticB = 'B'
    }

    const AB = Mixin(A, B)

    expect(AB.staticA).toBe('A')

    // Change the static property on the source class
    A.staticA = 'Modified A'

    // The mixed class should not reflect the change with copy strategy
    expect(AB.staticA).toBe('A')
  })
})
