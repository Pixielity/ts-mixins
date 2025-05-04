import { Mixin } from '../src/mixin'

describe('Basic Mixin Functionality', () => {
  class A {
    public aValue = 'A'
    public getValue(): string {
      return this.aValue
    }
  }

  class B {
    public bValue = 'B'
    public getValue(): string {
      return this.bValue
    }
  }

  it('should create a class that extends from both classes', () => {
    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance).toBeInstanceOf(A)
    expect(instance).toBeInstanceOf(B)
    expect(instance).toBeInstanceOf(AB)
  })

  it('should have properties from both classes', () => {
    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
  })

  it("should use the last class's implementation for duplicate methods", () => {
    const AB = Mixin(A, B)
    const instance = new AB()

    expect(instance.getValue()).toBe('B')

    const BA = Mixin(B, A)
    const instance2 = new BA()

    expect(instance2.getValue()).toBe('A')
  })

  it('should work with more than two classes', () => {
    class C {
      public cValue = 'C'
    }

    class D {
      public dValue = 'D'
    }

    const ABCD = Mixin(A, B, C, D)
    const instance = new ABCD()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance.cValue).toBe('C')
    expect(instance.dValue).toBe('D')
  })
})
