import { Mixin } from '../src/mixin'

describe('Abstract Classes', () => {
  it('should handle abstract classes', () => {
    abstract class AbstractA {
      public aValue = 'A'

      abstract abstractMethod(): string
    }

    class ConcreteB {
      public bValue = 'B'

      abstractMethod(): string {
        return 'implemented'
      }
    }

    // Use type assertion to tell TypeScript that the mixed class is concrete
    const Mixed = Mixin(AbstractA, ConcreteB) as new () => AbstractA & ConcreteB
    const instance = new Mixed()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance.abstractMethod()).toBe('implemented')
    expect(instance).toBeInstanceOf(AbstractA)
    expect(instance).toBeInstanceOf(ConcreteB)
  })

  it('should handle multiple abstract classes', () => {
    abstract class AbstractA {
      public aValue = 'A'

      abstract methodA(): string
    }

    abstract class AbstractB {
      public bValue = 'B'

      abstract methodB(): string
    }

    class ConcreteC {
      public cValue = 'C'

      methodA(): string {
        return 'A implemented'
      }

      methodB(): string {
        return 'B implemented'
      }
    }

    // Use type assertion to tell TypeScript that the mixed class is concrete
    const Mixed = Mixin(AbstractA, AbstractB, ConcreteC) as new () => AbstractA &
      AbstractB &
      ConcreteC
    const instance = new Mixed()

    expect(instance.aValue).toBe('A')
    expect(instance.bValue).toBe('B')
    expect(instance.cValue).toBe('C')
    expect(instance.methodA()).toBe('A implemented')
    expect(instance.methodB()).toBe('B implemented')
  })

  it('should throw an error if abstract methods are not implemented', () => {
    abstract class AbstractA {
      abstract methodA(): string
    }

    class ConcreteB {
      public bValue = 'B'
      // Does not implement methodA
    }

    // Use type assertion to tell TypeScript that the mixed class is concrete
    const Mixed = Mixin(AbstractA, ConcreteB) as new () => AbstractA & ConcreteB

    // Creating an instance should throw an error because methodA is not implemented
    expect(() => {
      const instance = new Mixed()
      instance.methodA()
    }).toThrow()
  })
})
