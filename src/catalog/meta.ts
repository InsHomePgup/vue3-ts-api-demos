// 页面目录元信息：标题、说明、标签都在这里维护，侧栏菜单和首页都读它
// Catalog metadata: titles, descriptions and tags live here; the sidebar menu and home page read from it.
// 新增页面后在 pageMeta 里按路由路径补一条即可；没有登记的页面会退回显示文件名
// After adding a page, register it in pageMeta by route path; unregistered pages fall back to the file name.

export interface PageMeta {
  title: string
  desc: string
  tags?: string[]
}

// 目录名 → 中文名；对象的键顺序就是菜单 / 首页里的排列顺序
// Directory → label; the key order is the display order in the menu and on the home page
export const dirLabels: Record<string, string> = {
  'ts': 'TypeScript',
  'ts/basics': '基础系列',
  'ts/vue': '在 Vue 中使用',
  'ts/practice': '练习片段',
  'vue': 'Vue',
  'tsx': 'TSX',
  'css': 'CSS',
  'css/layout': '布局',
  'css/layout/flex': 'Flex',
  'css/layout/grid': 'Grid',
  'css/animation': '动画',
  'css/style': '样式',
  'css/demo': '综合示例',
  'html': 'HTML',
  'axios': 'Axios',
}

// 路由路径 → 元信息 / route path → metadata
export const pageMeta: Record<string, PageMeta> = {
  // ---------- TypeScript · 基础系列(源码阅读)/ basics (source reading) ----------
  '/ts/basics/README': { title: '学习路线与说明', desc: '基础系列的目录、学习顺序,以及读第三方库类型的方法', tags: ['TS', '文档'] },
  '/ts/basics/01-basic-types': { title: '01 基础类型', desc: '原始类型、数组、元组、联合 / 字面量、any / unknown / never、枚举、断言', tags: ['TS'] },
  '/ts/basics/02-interface-and-alias': { title: '02 interface 与 type', desc: '继承、声明合并、索引签名、只读 / 可选、结构化类型', tags: ['TS'] },
  '/ts/basics/03-functions': { title: '03 函数', desc: '可选 / 默认 / 剩余参数、重载、this、回调、异步、构造函数类型', tags: ['TS'] },
  '/ts/basics/04-narrowing': { title: '04 类型收窄', desc: 'typeof / in / instanceof、类型守卫、判别联合、never 穷尽检查', tags: ['TS'] },
  '/ts/basics/05-generics': { title: '05 泛型', desc: '泛型函数 / 接口 / 类、约束、keyof、默认值、const 类型参数', tags: ['TS'] },
  '/ts/basics/06-classes': { title: '06 类', desc: '修饰符、参数属性、继承与 override、抽象类、implements、static', tags: ['TS'] },
  '/ts/basics/07-utility-types': { title: '07 内置工具类型', desc: 'Partial / Pick / Omit / Record / Exclude / ReturnType / Awaited 等', tags: ['TS'] },
  '/ts/basics/08-type-operations': { title: '08 类型运算', desc: 'keyof / typeof、条件类型、infer、映射类型、模板字面量、satisfies', tags: ['TS'] },
  '/ts/basics/09-modules-and-declarations': { title: '09 模块与声明文件', desc: 'import type、.d.ts、declare、全局 / 模块扩展、namespace', tags: ['TS'] },
  '/ts/basics/10-builtin-objects': { title: '10 内置对象的类型', desc: 'Map / Set / Promise / Date / 正则 / 迭代器 / 常用 DOM API 的类型', tags: ['TS'] },

  // ---------- TypeScript · 在 Vue 中使用 / using TS in Vue ----------
  '/ts/vue/01-props-emits': { title: 'Props / Emits / v-model / Slots', desc: '组件通信的类型标注、泛型组件、defineExpose 与子组件实例类型', tags: ['TS', 'Vue'] },
  '/ts/vue/02-reactivity': { title: '响应式 / computed / watch', desc: 'ref、reactive、computed、watch、模板引用和事件的类型写法', tags: ['TS', 'Vue'] },
  '/ts/vue/03-composables-inject': { title: 'Composable 与 provide / inject', desc: '元组返回、泛型 composable、InjectionKey 的类型安全注入', tags: ['TS', 'Vue'] },
  '/ts/vue/04-pinia-router-axios': { title: 'Pinia / Router / Axios', desc: 'setup store、storeToRefs、路由类型、Axios 泛型响应', tags: ['TS', 'Vue', 'Axios'] },

  // ---------- TypeScript · 练习片段 / practice ----------
  '/ts/practice/01-utility-intersection': { title: 'Omit 与交叉类型', desc: '用 Omit 移除属性、用 & 扩展类型', tags: ['TS'] },
  '/ts/practice/02-map-and-return': { title: 'map 与函数返回值', desc: '数组 map 回调的返回值,以及函数返回类型的标注', tags: ['TS'] },
  '/ts/practice/03-event-loop': { title: '事件循环', desc: '点击按钮,观察同步、微任务、宏任务的执行顺序', tags: ['JS', '交互'] },
  '/ts/practice/04-array-methods': { title: '数组常用方法', desc: '会改变 / 不会改变原数组的方法分类速查', tags: ['JS'] },
  '/ts/practice/05-string-methods': { title: '字符串常用方法', desc: '长度、大小写、查找、截取等字符串操作速查', tags: ['JS'] },
  '/ts/practice/baseType': { title: '基础类型速记', desc: '原始类型、数组等基础类型标注的最小示例', tags: ['TS'] },
  '/ts/practice/functionType': { title: '函数类型速记', desc: '函数声明、箭头函数、类型别名等函数类型写法', tags: ['TS'] },
  '/ts/practice/promiseDemo': { title: '手写 Promise', desc: '遵循 Promise/A+ 规范的 Promise 实现', tags: ['JS'] },
  '/ts/practice/typeChecking': { title: 'typeof 与 instanceof', desc: '各种值的运行时类型检测结果对照', tags: ['TS', 'JS'] },

  // ---------- Vue ----------
  '/vue/01-tree-selector': { title: '三级选择器', desc: 'InputCard 与 ThreeLevelSelector 组件:树形数据的选择', tags: ['Vue', '组件'] },
  '/vue/02-ref-reactive': { title: 'ref 与 reactive', desc: '最基础的响应式数据展示', tags: ['Vue'] },
  '/vue/03-transition': { title: 'Transition 过渡', desc: '用 UnoCSS 预设做淡入、滑动、缩放和列表过渡', tags: ['Vue', '动画'] },

  // ---------- TSX ----------
  '/tsx/01-jsx-component': { title: 'TSX 组件', desc: '在模板里使用 TSX 编写的 MyCard 组件', tags: ['TSX', '组件'] },

  // ---------- CSS · 布局 / layout ----------
  '/css/layout/flex/playground': { title: 'Flex 属性演示', desc: '实时调节容器与子项的 flex 属性(含高度),查看布局如何变化', tags: ['Flex', '交互'] },
  '/css/layout/flex/self-align-chat': { title: 'align-self 聊天气泡', desc: '用 self-start / self-end 让消息分别靠左、靠右', tags: ['Flex'] },
  '/css/layout/grid/01-tracks': { title: 'Grid 轨道定义', desc: 'grid-template-columns / rows 定义行列尺寸', tags: ['Grid'] },
  '/css/layout/grid/02-dashboard': { title: 'Grid 中台布局', desc: 'Header / Sidebar / Main / Footer 的经典后台布局', tags: ['Grid'] },
  '/css/layout/grid/03-dashboard-areas': { title: 'Grid 中台布局(areas)', desc: '用 grid-template-areas 命名区域的写法', tags: ['Grid'] },
  '/css/layout/resp': { title: '响应式布局', desc: '根据设备宽度切换移动端 / PC 端的栅格与侧栏', tags: ['响应式', 'UnoCSS'] },
  '/css/layout/bfc-margin': { title: 'BFC 与外边距合并', desc: '兄弟、父子元素的 margin 合并,以及用 BFC 阻止合并', tags: ['盒模型'] },

  // ---------- CSS · 动画 / animation ----------
  '/css/animation/animate': { title: 'UnoCSS 动画预设', desc: 'unocss-preset-animations:淡入、缩放、滑入、旋转等可组合动画', tags: ['动画', 'UnoCSS'] },
  '/css/animation/transform': { title: 'transform 变换', desc: 'translate / scale / rotate / skew / matrix / transform-origin,悬停查看', tags: ['动画'] },
  '/css/animation/transition': { title: 'transition 位移过渡', desc: '点击按钮,让方块平滑移动', tags: ['动画'] },
  '/css/animation/transition-behavior': { title: 'transition-behavior', desc: 'allow-discrete 让 display 等离散属性也能过渡', tags: ['动画'] },

  // ---------- CSS · 样式 / style ----------
  '/css/style/background': { title: 'background 背景', desc: '颜色、图片、重复、位置、尺寸等背景属性', tags: ['样式'] },
  '/css/style/border-radius': { title: 'border-radius 圆角', desc: '统一圆角、四角分别设置、椭圆圆角', tags: ['样式'] },

  // ---------- CSS · 综合示例 / demo ----------
  '/css/demo/chat': { title: '聊天界面', desc: '带时间分隔线和左右气泡的聊天记录页', tags: ['综合', 'UnoCSS'] },

  // ---------- 其他 / others ----------
  '/html/01-tag': { title: 'HTML5 语义化标签', desc: 'header / nav / main / section / aside / footer 等标签的页面结构', tags: ['HTML'] },
  '/axios/01-abort-request': { title: '取消请求', desc: '用 AbortController 取消 Axios 请求', tags: ['Axios'] },
}
