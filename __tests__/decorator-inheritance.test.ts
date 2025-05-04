import { Mixin } from '../src/mixin'
import { Decorate } from '../src/decorators'
import { settings } from '../src/config/settings.setting'
import { jest } from '@jest/globals'

describe('Decorator Inheritance', () => {
  // Save original settings
  const originalSettings = { ...settings }

  // Restore settings after tests
  afterEach(() => {
    Object.assign(settings, originalSettings)
  })

  it('should inherit class decorators with deep inheritance', () => {
    settings.decoratorInheritance = 'deep'

    const classDecorator = jest.fn((target: any) => target)

    @Decorate(classDecorator)
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(classDecorator).toHaveBeenCalledTimes(2)
    expect(classDecorator).toHaveBeenCalledWith(A)
    expect(classDecorator).toHaveBeenCalledWith(AB)
  })

  it('should inherit property decorators', () => {
    // Create a properly typed property decorator
    const propertyDecorator: PropertyDecorator = jest.fn(
      (target: Object, key: string | symbol) => {},
    )

    class A {
      @Decorate(propertyDecorator)
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(propertyDecorator).toHaveBeenCalledTimes(2)
    expect(propertyDecorator).toHaveBeenCalledWith(A.prototype, 'aValue')
    expect(propertyDecorator).toHaveBeenCalledWith(AB.prototype, 'aValue')
  })

  it('should inherit method decorators', () => {
    // Create a properly typed method decorator
    const methodDecorator: MethodDecorator = jest.fn(
      (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => descriptor,
    )

    class A {
      @Decorate(methodDecorator)
      public getValue(): string {
        return 'A'
      }
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(methodDecorator).toHaveBeenCalledTimes(2)
    expect(methodDecorator).toHaveBeenCalledWith(A.prototype, 'getValue', expect.any(Object))
    expect(methodDecorator).toHaveBeenCalledWith(AB.prototype, 'getValue', expect.any(Object))
  })

  // @todo fix this case issue
  // it('should inherit static property and method decorators', () => {
  //   // Create properly typed decorators
  //   const staticPropertyDecorator: PropertyDecorator = jest.fn(
  //     (target: Object, key: string | symbol) => {},
  //   )
  //   const staticMethodDecorator: MethodDecorator = jest.fn(
  //     (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => descriptor,
  //   )

  //   class A {
  //     @Decorate(staticPropertyDecorator)
  //     static staticValue = 'static'

  //     @Decorate(staticMethodDecorator)
  //     static staticMethod(): string {
  //       return 'static method'
  //     }
  //   }

  //   class B {
  //     public bValue = 'B'
  //   }

  //   const AB = Mixin(A, B)

  //   expect(staticPropertyDecorator).toHaveBeenCalledTimes(2)
  //   expect(staticPropertyDecorator).toHaveBeenCalledWith(A, 'staticValue')
  //   expect(staticPropertyDecorator).toHaveBeenCalledWith(AB, 'staticValue')

  //   expect(staticMethodDecorator).toHaveBeenCalledTimes(2)
  //   expect(staticMethodDecorator).toHaveBeenCalledWith(A, 'staticMethod', expect.any(Object))
  //   expect(staticMethodDecorator).toHaveBeenCalledWith(AB, 'staticMethod', expect.any(Object))
  // })

  it("should not inherit decorators when decoratorInheritance is 'none'", () => {
    settings.decoratorInheritance = 'none'

    const classDecorator = jest.fn((target: any) => target)

    @Decorate(classDecorator)
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    expect(classDecorator).toHaveBeenCalledTimes(1)
    expect(classDecorator).toHaveBeenCalledWith(A)
  })

  it("should only inherit direct decorators when decoratorInheritance is 'direct'", () => {
    settings.decoratorInheritance = 'direct'

    const classDecorator1 = jest.fn((target: any) => target)
    const classDecorator2 = jest.fn((target: any) => target)

    @Decorate(classDecorator1)
    class A {
      public aValue = 'A'
    }

    @Decorate(classDecorator2)
    class B extends A {
      public bValue = 'B'
    }

    class C {
      public cValue = 'C'
    }

    const BC = Mixin(B, C)

    expect(classDecorator1).toHaveBeenCalledTimes(1)
    expect(classDecorator1).toHaveBeenCalledWith(A)

    expect(classDecorator2).toHaveBeenCalledTimes(2)
    expect(classDecorator2).toHaveBeenCalledWith(B)
    expect(classDecorator2).toHaveBeenCalledWith(BC)
  })
})
