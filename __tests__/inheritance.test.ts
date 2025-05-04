import { Mixin } from '../src/mixin'

describe('Inheritance', () => {
  it('should inherit from parent classes', () => {
    class Parent {
      public parentValue = 'parent'
    }

    class Child extends Parent {
      public childValue = 'child'
    }

    class Other {
      public otherValue = 'other'
    }

    const Mixed = Mixin(Child, Other)
    const instance = new Mixed()

    expect(instance.parentValue).toBe('parent')
    expect(instance.childValue).toBe('child')
    expect(instance.otherValue).toBe('other')
    expect(instance).toBeInstanceOf(Parent)
    expect(instance).toBeInstanceOf(Child)
    expect(instance).toBeInstanceOf(Other)
    expect(instance).toBeInstanceOf(Mixed)
  })

  it('should handle method overrides in inheritance chain', () => {
    class Parent {
      public getValue(): string {
        return 'parent'
      }
    }

    class Child extends Parent {
      public getValue(): string {
        return 'child'
      }
    }

    class Other {
      public getValue(): string {
        return 'other'
      }
    }

    const ChildOther = Mixin(Child, Other)
    const instance = new ChildOther()

    expect(instance.getValue()).toBe('other')

    const OtherChild = Mixin(Other, Child)
    const instance2 = new OtherChild()

    expect(instance2.getValue()).toBe('child')
  })

  it('should handle complex inheritance chains', () => {
    class GrandParent {
      public grandParentValue = 'grandparent'
    }

    class Parent extends GrandParent {
      public parentValue = 'parent'
    }

    class Child extends Parent {
      public childValue = 'child'
    }

    class OtherParent {
      public otherParentValue = 'otherparent'
    }

    class OtherChild extends OtherParent {
      public otherChildValue = 'otherchild'
    }

    const Mixed = Mixin(Child, OtherChild)
    const instance = new Mixed()

    expect(instance.grandParentValue).toBe('grandparent')
    expect(instance.parentValue).toBe('parent')
    expect(instance.childValue).toBe('child')
    expect(instance.otherParentValue).toBe('otherparent')
    expect(instance.otherChildValue).toBe('otherchild')
    expect(instance).toBeInstanceOf(GrandParent)
    expect(instance).toBeInstanceOf(Parent)
    expect(instance).toBeInstanceOf(Child)
    expect(instance).toBeInstanceOf(OtherParent)
    expect(instance).toBeInstanceOf(OtherChild)
    expect(instance).toBeInstanceOf(Mixed)
  })
})
