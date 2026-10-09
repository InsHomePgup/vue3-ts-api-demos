// ============================================================
// 06 类
// 06 Classes
// ============================================================

// 1. 基本写法：字段、构造函数、方法
// 1. Basics: fields, constructor, methods
export class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }

  speak(): string {
    return `${this.name} makes a sound`
  }
}

// 2. 访问修饰符：public（默认）/ protected / private / readonly
// 2. Access modifiers: public (default) / protected / private / readonly
export class Account {
  readonly id: number // 只能在声明处或构造函数中赋值 | Can only be assigned at declaration or in the constructor
  protected owner: string // 自身和子类可访问 | Accessible in the class itself and subclasses
  private balance = 0 // 仅自身可访问（仅编译期限制） | Accessible only in the class itself (compile-time restriction only)
  #secret = 'x' // ES 私有字段，运行时真正私有 | ES private field, truly private at runtime

  constructor(id: number, owner: string) {
    this.id = id
    this.owner = owner
  }

  deposit(amount: number): number {
    this.balance += amount
    return this.balance
  }

  getSecret(): string {
    return this.#secret
  }
}

// 3. 参数属性：在构造函数参数前加修饰符，自动声明并赋值字段
// 3. Parameter properties: add a modifier before a constructor parameter to declare and assign the field automatically
// 注意：开启 erasableSyntaxOnly 时不可用
// Note: not available when erasableSyntaxOnly is enabled
export class Point {
  constructor(
    public x: number,
    public y: number,
    readonly z: number = 0,
  ) {}
}

// 4. 继承 extends 与 override（开启 noImplicitOverride 后必须写 override）
// 4. Inheritance with extends and override (override is required when noImplicitOverride is enabled)
export class Dog extends Animal {
  override speak(): string {
    return `${this.name} barks`
  }
}

// 5. getter / setter
// 5. getter / setter
export class Temperature {
  private _celsius = 0

  get celsius(): number {
    return this._celsius
  }

  set celsius(value: number) {
    this._celsius = value
  }

  get fahrenheit(): number {
    return this._celsius * 1.8 + 32
  }
}

// 6. 静态成员
// 6. Static members
export class Counter {
  static count = 0
  static inc(): number {
    return ++Counter.count
  }
}

// 7. 抽象类：不能直接实例化，用来定义子类必须实现的成员
// 7. Abstract classes: cannot be instantiated directly, used to define members that subclasses must implement
export abstract class Shape {
  abstract area(): number

  describe(): string {
    return `area = ${this.area()}`
  }
}

export class Circle extends Shape {
  constructor(private radius: number) {
    super()
  }

  area(): number {
    return Math.PI * this.radius ** 2
  }
}

// 8. implements：类实现接口，只检查形状，不会继承任何实现
// 8. implements: a class implements an interface, only the shape is checked, no implementation is inherited
export interface Flyable {
  fly: () => void
}
export interface Swimmable {
  swim: () => void
}

export class Duck implements Flyable, Swimmable {
  fly(): void {}
  swim(): void {}
}

// 9. 类本身既是值也是类型
// 9. A class is both a value and a type
export const dog: Dog = new Dog('旺财') // 作为类型：实例类型 | As a type: the instance type
export type DogCtor = typeof Dog // 作为值：构造函数类型 | As a value: the constructor type
export type DogInstance = InstanceType<typeof Dog>

// 10. 属性初始化：strictPropertyInitialization
// 10. Property initialization: strictPropertyInitialization
export class User {
  name = '' // 声明时初始化 | Initialized at declaration
  age!: number // 明确断言"稍后会赋值"，慎用 | Explicitly asserts "will be assigned later", use with caution
  email?: string // 可选 | Optional
  nick: string | undefined // 允许 undefined，但要显式赋值或在构造函数里赋值 | Allows undefined, but must be assigned explicitly or in the constructor

  constructor() {
    this.nick = undefined
  }
}

// 11. this 类型：方法链
// 11. this type: method chaining
export class Query {
  private conditions: string[] = []

  where(cond: string): this {
    this.conditions.push(cond)
    return this
  }

  build(): string {
    return this.conditions.join(' AND ')
  }
}
export const sql = new Query().where('a = 1').where('b = 2').build()

// 12. 泛型类（详见 05）
// 12. Generic classes (see 05)
export class Container<T> {
  constructor(public value: T) {}
}

// 13. 静态块与索引签名
// 13. Static blocks and index signatures
export class Registry {
  static items: Record<string, number> = {}
  static {
    // eslint-disable-next-line dot-notation
    Registry.items['default'] = 0
  }

  [key: string]: unknown
}

// 14. 类的结构化兼容：只看形状，不看名字
// 14. Structural compatibility of classes: only the shape matters, not the name
class A {
  x = 1
}
class B {
  x = 2
}
export const a: A = new B() // 允许，但有 private / protected 成员时会变成名义类型 | Allowed, but with private / protected members it becomes nominal typing
