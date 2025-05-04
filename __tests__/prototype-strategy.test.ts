import { Mixin } from '../src/mixin'
import { settings } from '../src/config/settings.setting'

describe('Prototype Strategy', () => {
  // Save original settings
  const originalSettings = { ...settings }

  // Restore settings after tests
  afterEach(() => {
    Object.assign(settings, originalSettings)
  })

  it('should copy prototype properties with copy strategy', () => {
    settings.prototypeStrategy = 'copy'

    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
  })

  it('should not reflect changes to source prototype with copy strategy', () => {
    settings.prototypeStrategy = 'copy'

    class A {
      public getValue(): string {
        return 'A'
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.getValue()).toBe('A')

    // Modify the prototype of the source class
    A.prototype.getValue = () => 'Modified A'

    // The mixed class should not reflect the change with copy strategy
    expect(instance.getValue()).toBe('A')
  })

  it('should proxy prototype properties with proxy strategy', () => {
    settings.prototypeStrategy = 'proxy'

    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
  })

  it('should reflect changes to source prototype with proxy strategy', () => {
    settings.prototypeStrategy = 'proxy'

    class A {
      public getValue(): string {
        return 'A'
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.getValue()).toBe('A')

    // Modify the prototype of the source class
    A.prototype.getValue = () => 'Modified A'

    // The mixed class should reflect the change with proxy strategy
    expect(instance.getValue()).toBe('Modified A')
  })
})
