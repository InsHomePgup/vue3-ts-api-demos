// ============================================================
// 06 类
// ============================================================

// 1. 基本写法：字段、构造函数、方法
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
export class Account {
  readonly id: number // 只能在声明处或构造函数中赋值
  protected owner: string // 自身和子类可访问
  private balance = 0 // 仅自身可访问（仅编译期限制）
  #secret = 'x' // ES 私有字段，运行时真正私有

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
// 注意：开启 erasableSyntaxOnly 时不可用
export class Point {
  constructor(
    public x: number,
    public y: number,
    readonly z: number = 0,
  ) {}
}

// 4. 继承 extends 与 override（开启 noImplicitOverride 后必须写 override）
export class Dog extends Animal {
  override speak(): string {
    return `${this.name} barks`
  }
}

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
export class Counter {
  static count = 0
  static inc(): number {
    return ++Counter.count
  }
}

// 7. 抽象类：不能直接实例化，用来定义子类必须实现的成员
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
export const dog: Dog = new Dog('旺财') // 作为类型：实例类型
export type DogCtor = typeof Dog // 作为值：构造函数类型
export type DogInstance = InstanceType<typeof Dog>

// 10. 属性初始化：strictPropertyInitialization
export class User {
  name = '' // 声明时初始化
  age!: number // 明确断言"稍后会赋值"，慎用
  email?: string // 可选
  nick: string | undefined // 允许 undefined，但要显式赋值或在构造函数里赋值

  constructor() {
    this.nick = undefined
  }
}

// 11. this 类型：方法链
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
export class Container<T> {
  constructor(public value: T) {}
}

// 13. 静态块与索引签名
export class Registry {
  static items: Record<string, number> = {}
  static {
    // eslint-disable-next-line dot-notation
    Registry.items['default'] = 0
  }

  [key: string]: unknown
}

// 14. 类的结构化兼容：只看形状，不看名字
class A {
  x = 1
}
class B {
  x = 2
}
export const a: A = new B() // 允许，但有 private / protected 成员时会变成名义类型
