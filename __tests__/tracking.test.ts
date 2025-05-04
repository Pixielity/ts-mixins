import { Mixin } from '../src/mixin'
import { hasMixin, getMixinsForClass } from '../src/tracking'

describe('Tracking', () => {
  it('should track mixins for a class', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    const AB = Mixin(A, B)

    const mixins = getMixinsForClass(AB)

    expect(mixins).toHaveLength(2)
    expect(mixins).toContain(A)
    expect(mixins).toContain(B)
  })

  it('should detect if an instance has a mixin', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    class C {
      public cValue = 'C'
    }

    const AB = Mixin(A, B)
    const instance = new AB()

    expect(hasMixin(instance, A)).toBe(true)
    expect(hasMixin(instance, B)).toBe(true)
    expect(hasMixin(instance, C)).toBe(false)
  })

  it('should detect mixins in complex inheritance chains', () => {
    class A {
      public aValue = 'A'
    }

    class B {
      public bValue = 'B'
    }

    class C {
      public cValue = 'C'
    }

    const AB = Mixin(A, B)
    const ABC = Mixin(AB, C)

    const instance = new ABC()

    expect(hasMixin(instance, A)).toBe(true)
    expect(hasMixin(instance, B)).toBe(true)
    expect(hasMixin(instance, C)).toBe(true)
    expect(hasMixin(instance, AB)).toBe(true)
  })
})
