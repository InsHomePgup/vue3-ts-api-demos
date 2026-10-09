# TypeScript 基础系列

目标：覆盖 TS 的全部基础用法。更深入的类型，到使用的库里（`.d.ts` / `@types`）去查看学习。

每个文件都是可以直接阅读的演示，没有运行时逻辑，重点在类型与注释。

| 文件 | 内容 |
| --- | --- |
| `01-basic-types.ts` | 原始类型、数组、元组、对象、联合 / 字面量、any / unknown / never / void、枚举、断言 |
| `02-interface-and-alias.ts` | interface 与 type、继承、声明合并、索引签名、只读 / 可选、结构化类型 |
| `03-functions.ts` | 参数（可选 / 默认 / 剩余 / 解构）、重载、this、回调、异步、构造函数类型 |
| `04-narrowing.ts` | typeof / in / instanceof、类型守卫、断言函数、判别联合、never 穷尽检查 |
| `05-generics.ts` | 泛型函数 / 接口 / 类、约束、keyof、默认值、const 类型参数 |
| `06-classes.ts` | 修饰符、参数属性、继承与 override、抽象类、implements、getter / setter、static |
| `07-utility-types.ts` | Partial / Pick / Omit / Record / Exclude / ReturnType / Awaited 等内置工具类型 |
| `08-type-operations.ts` | typeof / keyof / 索引访问、条件类型、infer、映射类型、模板字面量、satisfies |
| `09-modules-and-declarations.ts` | import type、`.d.ts`、declare、全局 / 模块扩展、namespace |

## 学习路线

1. 01 到 04：日常编码最常用，优先掌握。
2. 05 到 07：写通用代码和读懂库的类型必备。
3. 08 到 09：偏"读类型"的能力，能读懂库里的定义即可，不必精通类型体操。

## 读第三方库类型的方法

- 编辑器里 Ctrl / Cmd + 点击跳转到定义，查看 `node_modules/xxx/*.d.ts` 或 `@types/xxx`。
- 悬浮看展开后的类型，复杂时借助 `Simplify`（见 07）。
- 重点看：泛型参数、函数重载、`extends` 条件类型和 `infer`。
- 需要给库补充类型时，用 `declare module` 做模块扩展（见 09）。

## tsconfig 中与这个项目相关的严格选项

- `strict`：开启全部严格检查（`strictNullChecks`、`noImplicitAny`、`strictFunctionTypes` 等）。
- `noUnusedLocals` / `noUnusedParameters`：未使用的变量 / 参数会报错，所以示例都用 `export` 导出。
- `noImplicitOverride`：子类重写方法必须写 `override`。
- `noPropertyAccessFromIndexSignature`：索引签名的属性必须用 `obj['key']` 访问。
- `noImplicitReturns`：所有分支都要有返回值。
- `isolatedModules`：仅作类型使用的导入建议写 `import type`。
