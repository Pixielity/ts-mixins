import { Mix } from '../src/decorators'

describe('Mix Decorator', () => {
  it('should mix classes using the decorator', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    // Define an interface that represents the mixed class
    interface MixedC extends A, B {
      cValue: string
    }

    @Mix(A, B)
    class C {
      public cValue = 'C'
    }

    // Use type assertion to tell TypeScript about the mixed properties
    const instance = new C() as MixedC

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance.cValue).toBe('C')
    expect(instance).toBeInstanceOf(A)
    expect(instance).toBeInstanceOf(B)
    expect(instance).toBeInstanceOf(C)
  })

  it('should preserve the name of the decorated class', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    @Mix(A, B)
    class MyClass {
      public myValue = 'MyClass'
    }

    expect(MyClass.name).toBe('MyClass')
  })

  it('should work with inheritance', () => {
    class Parent {
      public parentValue = 'parent'
    }

    class Child extends Parent {
      public childValue = 'child'
    }

    class A {
      public aValue = 'A'
    }

    // Define an interface that represents the mixed class
    interface MixedB extends Child, A {
      bValue: string
    }

    @Mix(A)
    class B extends Child {
      public bValue = 'B'
    }

    // Use type assertion to tell TypeScript about the mixed properties
    const instance = new B() as MixedB

    expect(instance.parentValue).toBe('parent')
    expect(instance.childValue).toBe('child')
    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance).toBeInstanceOf(Parent)
    expect(instance).toBeInstanceOf(Child)
    expect(instance).toBeInstanceOf(A)
    expect(instance).toBeInstanceOf(B)
  })

  it('should handle multiple decorators', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    class C {
      public cValue = 'C'
    }

    // Define an interface that represents the mixed class
    interface MixedD extends A, B, C {
      dValue: string
    }

    @Mix(C)
    @Mix(A, B)
    class D {
      public dValue = 'D'
    }

    // Use type assertion to tell TypeScript about the mixed properties
    const instance = new D() as MixedD

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance.cValue).toBe('C')
    expect(instance.dValue).toBe('D')
  })
})
