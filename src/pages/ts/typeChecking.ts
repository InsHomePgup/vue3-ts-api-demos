// typeof 和 instanceof 类型检查示例

// 辅助函数：同时显示表达式和结果
function logWithExpression(expr: string, result: any) {
  console.log(`${expr} => ${result}`)
}

// 1. 基本类型检测
export function checkPrimitiveTypes() {
  console.log('--- 基本类型检测 ---')
  logWithExpression('typeof \'hello\'', typeof 'hello')
  logWithExpression('typeof 123', typeof 123)
  logWithExpression('typeof true', typeof true)
  logWithExpression('typeof undefined', typeof undefined)
  logWithExpression('typeof null', typeof null) // 历史遗留问题
  logWithExpression('typeof Symbol(\'sym\')', typeof Symbol('sym'))
  logWithExpression('typeof 123n', typeof 123n)
  logWithExpression('typeof function () {}', typeof function () {})
}

// 2. 对象类型判断
export function checkObjectTypes() {
  console.log('\n--- 对象类型判断 ---')
  logWithExpression('typeof {}', typeof {})
  logWithExpression('typeof []', typeof [])
  logWithExpression('typeof new Date()', typeof new Date())

  // 使用instanceof判断具体对象类型
  logWithExpression('Array.isArray([])', Array.isArray([]))
  logWithExpression('{} instanceof Object', {} instanceof Object)
  logWithExpression('new Date() instanceof Date', new Date() instanceof Date)
  logWithExpression('/regex/ instanceof RegExp', /regex/ instanceof RegExp)
}

// 3. 自定义类实例检查
export function checkCustomClassInstances() {
  console.log('\n--- 自定义类实例检查 ---')
  const person = new Person('张三', 25)

  logWithExpression('typeof person', typeof person)
  logWithExpression('person instanceof Person', person instanceof Person)
  logWithExpression('person instanceof Object', person instanceof Object)

  // 继承关系检查
  class Student extends Person {
    constructor(name: string, age: number) {
      super(name, age)
    }
  }
  const student = new Student('李四', 20)
  logWithExpression('student instanceof Student', student instanceof Student)
  logWithExpression('student instanceof Person', student instanceof Person)
  logWithExpression('student instanceof Object', student instanceof Object)
}

// 4. 特殊情况
// export function checkEdgeCases() {
//   console.log('\n--- 特殊情况 ---')
//   // 原始值 vs 包装对象
//   logWithExpression('\'hello\' instanceof String', 'hello' instanceof String)
//   logWithExpression('new String(\'hello\') instanceof String', new String('hello') instanceof String)
//
//   // 跨窗口/框架问题
//   const iframe = document.createElement('iframe')
//   document.body.appendChild(iframe)
//   const iframeArray = window.frames[0].Array
//   const arr = new iframeArray()
//   logWithExpression('Array.isArray(arr)', Array.isArray(arr)) // 不同全局环境
//   logWithExpression('arr instanceof iframeArray', arr instanceof iframeArray)
//   document.body.removeChild(iframe)
// }

// 运行所有检查
export function runAllTypeChecks() {
  checkPrimitiveTypes()
  checkObjectTypes()
  checkCustomClassInstances()
  checkEdgeCases()
}

runAllTypeChecks()
