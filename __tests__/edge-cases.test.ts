import { Mixin } from '../src/mixin'

describe('Edge Cases', () => {
  it('should handle empty classes', () => {
    class A {}
    class B {}

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance).toBeInstanceOf(A)
    expect(instance).toBeInstanceOf(B)
    expect(instance).toBeInstanceOf(AB)
  })

  it('should handle a single class', () => {
    class A {
      public aValue = 'A'
    }

    const SingleMixin = Mixin(A)
    const instance = new SingleMixin()

    expect(instance.aValue).toBe('A')
    expect(instance).toBeInstanceOf(A)
    expect(instance).toBeInstanceOf(SingleMixin)
  })

  it('should handle classes with getters and setters', () => {
    class A {
      private _value = 'initial'

      get value(): string {
        return this._value
      }

      set value(val: string) {
        this._value = val
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.value).toBe('initial')

    instance.value = 'modified'
    expect(instance.value).toBe('modified')
  })

  it('should handle classes with Symbol properties', () => {
    const symbolA = Symbol('A')
    const symbolB = Symbol('B')

    class A {
      [symbolA] = 'A'
    }

    class B {
      [symbolB] = 'B'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance[symbolA]).toBe('A')
    expect(instance[symbolB]).toBe('B')
  })

  it('should handle classes with methods that use this', () => {
    class A {
      private _value = 'A'

      getValue(): string {
        return this._value
      }

      setValue(val: string): void {
        this._value = val
      }
    }

    class B {
      getValueFromA(): string {
        // @ts-ignore: TypeScript doesn't know this will have getValue
        return this.getValue()
      }
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.getValue()).toBe('A')
    expect(instance.getValueFromA()).toBe('A')

    instance.setValue('modified')
    expect(instance.getValue()).toBe('modified')
    expect(instance.getValueFromA()).toBe('modified')
  })

  it('should handle circular references', () => {
    class A {
      public b: B | null = null
    }

    class B {
      public a: A | null = null
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    instance.a = instance
    instance.b = instance

    expect(instance.a).toBe(instance)
    expect(instance.b).toBe(instance)
  })

  it('should handle classes with non-enumerable properties', () => {
    class A {}
    Object.defineProperty(A.prototype, 'hiddenValue', {
      value: 'hidden',
      enumerable: false,
      writable: true,
      configurable: true,
    })

    class B {}

    // Define an interface that includes the non-enumerable property
    interface ABWithHidden extends A, B {
      hiddenValue: string
    }

    const AB = Mixin(A, B)
    // Use type assertion to tell TypeScript about the non-enumerable property
    const instance = new AB() as ABWithHidden

    expect(instance.hiddenValue).toBe('hidden')

    // The property should still be non-enumerable
    expect(Object.keys(instance).includes('hiddenValue')).toBe(false)
  })
})
