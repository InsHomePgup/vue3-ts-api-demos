<template>
  <div class="page">
    <h2>响应式 / computed / watch / 模板引用 / 事件</h2>

    <p>count: {{ count }}，double: {{ double }}，triple: {{ triple }}</p>
    <button @click="count++">
      +1
    </button>

    <p>state.name: {{ state.name }}（toRefs 解构：{{ name }}）</p>
    <input v-model="state.name">

    <p>fullName（可写 computed）：{{ fullName }}</p>
    <input v-model="fullName">

    <p>原生事件：</p>
    <input ref="input" :value="text" @input="onInput">
    <button @click="onClick">
      点击（MouseEvent）
    </button>
    <p>text: {{ text }}，最近点击坐标：{{ point }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, onMounted, reactive, ref, toRefs, toValue, useTemplateRef, watch, watchEffect } from 'vue'

// 1. ref：基础类型自动推断；联合 / 复杂类型用泛型声明
// 1. ref: primitive types are inferred automatically; use generics for union / complex types
const count = ref(0) // Ref<number>
const id = ref<string | number>('a') // Ref<string | number>
const text = ref('')
const point = ref<{ x: number, y: number } | null>(null)

// 2. reactive：用接口标注，toRefs 解构后保持响应式
// 2. reactive: annotate with an interface; destructure via toRefs to keep reactivity
interface State {
  name: string
  tags: string[]
}
const state = reactive<State>({ name: 'foo', tags: [] })
const { name } = toRefs(state) // Ref<string>

// 3. computed：自动推断返回值，也可以显式标注
// 3. computed: return type is inferred automatically, or can be annotated explicitly
const double = computed(() => count.value * 2) // ComputedRef<number>
const triple: ComputedRef<number> = computed(() => count.value * 3)

// 可写 computed：get / set 都要写，泛型指定类型
// Writable computed: both get / set are required; specify the type via generic
const first = ref('三')
const last = ref('张')
const fullName = computed<string>({
  get: () => `${last.value} ${first.value}`,
  set(value) {
    // noUncheckedIndexedAccess 下，数组解构出来的值可能是 undefined，要给默认值
    // Under noUncheckedIndexedAccess, destructured array values may be undefined, so provide defaults
    const [l = '', f = ''] = value.split(' ')
    last.value = l
    first.value = f
  },
})

// 4. watch：回调参数类型自动推断
// 4. watch: callback param types are inferred automatically
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} -> ${newVal}`) // 都是 number | Both are number
})

// 监听多个源：新旧值是元组
// Watching multiple sources: new and old values are tuples
watch([count, first], ([newCount, newFirst], [oldCount, oldFirst]) => {
  console.log(newCount, newFirst, oldCount, oldFirst)
})

// 监听 getter：深层属性要用函数返回
// Watching a getter: deep properties must be returned from a function
watch(() => state.name, (newName) => {
  console.log(newName.toUpperCase())
})

watchEffect(() => {
  console.log(id.value) // 读取即收集依赖 | Reading collects the dependency
})

// 5. MaybeRefOrGetter<T>：参数既可以是值、ref，也可以是 getter（VueUse 风格）
// 5. MaybeRefOrGetter<T>: the param can be a value, a ref, or a getter (VueUse style)
function useDouble(n: MaybeRefOrGetter<number>): ComputedRef<number> {
  return computed(() => toValue(n) * 2)
}
useDouble(1)
useDouble(count)
useDouble(() => count.value + 1)

// 6. DOM 模板引用 + 原生事件：事件对象要自己标注
// 6. DOM template refs + native events: event objects must be annotated manually
const inputRef = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  inputRef.value?.focus() // 挂载前是 null，所以要可选链 | null before mount, so optional chaining is needed
})

function onInput(e: Event): void {
  // e.target 的类型是 EventTarget | null，需要断言成具体元素
  // e.target is typed EventTarget | null; assert it to the concrete element
  text.value = (e.target as HTMLInputElement).value
}

function onClick(e: MouseEvent): void {
  point.value = { x: e.clientX, y: e.clientY }
}
</script>

<style scoped>
.page {
  padding: 16px;
}
</style>
