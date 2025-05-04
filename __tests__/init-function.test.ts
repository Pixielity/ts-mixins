import { Mixin } from '../src/mixin'
import { settings } from '../src/config/settings.setting'

describe('Initialization Function', () => {
  // Save original settings
  const originalSettings = { ...settings }

  // Restore settings after tests
  afterEach(() => {
    Object.assign(settings, originalSettings)
  })

  it('should call the initialization function if configured', () => {
    settings.initFunction = 'init'

    class A {
      public aInitialized = false

      init() {
        this.aInitialized = true
      }
    }

    class B {
      public bInitialized = false

      init() {
        this.bInitialized = true
      }
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aInitialized).toBe(true)
    expect(instance.bInitialized).toBe(true)
  })

  it('should pass constructor arguments to the initialization function', () => {
    settings.initFunction = 'init'

    class A {
      public aValue = ''

      init(value: string) {
        this.aValue = value
      }
    }

    class B {
      public bValue = 0

      init(_: string, value: number) {
        this.bValue = value
      }
    }

    // Use type assertion to specify the constructor signature
    const AB = Mixin(A, B) as new (arg1: string, arg2: number) => A & B
    const instance = new AB('test', 42)

    expect(instance.aValue).toBe('test')
    expect(instance.bValue).toBe(42)
  })

  it('should not call the initialization function if not configured', () => {
    settings.initFunction = null

    class A {
      public aInitialized = false

      init() {
        this.aInitialized = true
      }
    }

    class B {
      public bInitialized = false

      init() {
        this.bInitialized = true
      }
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aInitialized).toBe(false)
    expect(instance.bInitialized).toBe(false)
  })

  it('should handle classes without the initialization function', () => {
    settings.initFunction = 'init'

    class A {
      public aInitialized = false

      init() {
        this.aInitialized = true
      }
    }

    class B {
      public bValue = 'B'
      // No init function
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aInitialized).toBe(true)
    expect(instance.bValue).toBe('B')
  })
})
