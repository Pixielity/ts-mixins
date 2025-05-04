import { Mixin } from '../src/mixin'

describe('Constructor Arguments', () => {
  class A {
    public aValue: string

    constructor(value: string) {
      this.aValue = value
    }
  }

  class B {
    public bValue: number

    constructor(value: number) {
      this.bValue = value
    }
  }

  it('should pass constructor arguments to all mixed classes', () => {
    // Use type assertion to specify the constructor signature
    const AB = Mixin(A, B) as new (arg1: string, arg2: number) => A & B
    const instance = new AB('test', 42)

    expect(instance.aValue).toBe('test')
    expect(instance.bValue).toBe(42)
  })

  it('should handle missing constructor arguments', () => {
    // Use type assertion to specify the constructor signature
    const AB = Mixin(A, B) as new (arg1: string, arg2?: number) => A & B
    const instance = new AB('test')

    expect(instance.aValue).toBe('test')
    expect(instance.bValue).toBeUndefined()
  })

  it('should handle classes with different constructor signatures', () => {
    class C {
      public cValue: string[]

      constructor(...values: string[]) {
        this.cValue = values
      }
    }

    // Use type assertion to specify the constructor signature
    const AC = Mixin(A, C) as new (arg1: string, ...rest: string[]) => A & C
    const instance = new AC('test', 'one', 'two')

    expect(instance.aValue).toBe('test')
    expect(instance.cValue).toEqual(['test', 'one', 'two'])
  })

  it('should handle classes with optional constructor parameters', () => {
    class D {
      public dValue: string
      public dOptional: string

      constructor(value: string, optional = 'default') {
        this.dValue = value
        this.dOptional = optional
      }
    }

    // Use type assertion to specify the constructor signature
    const AD = Mixin(A, D) as new (arg1: string, arg2?: string) => A & D
    const instance = new AD('test')

    expect(instance.aValue).toBe('test')
    expect(instance.dValue).toBe('test')
    expect(instance.dOptional).toBe('default')

    const instance2 = new AD('test', 'custom')
    expect(instance2.dOptional).toBe('custom')
  })
})
