<template>
  <div class="p-5">
    <h3>Flex 容器属性 / Flex container properties</h3>
    <p class="tip">
      切换下面的属性,观察容器内子项的变化。 / Change the properties below and watch the items.
    </p>

    <!-- 控制面板 / Control panel -->
    <div class="panel">
      <label v-for="p in props" :key="p.name">
        <code>{{ p.name }}</code>
        <select v-model="state[p.name]">
          <option v-for="v in p.values" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>
      <label>
        <code>gap</code>
        <input v-model="state.gap" type="range" min="0" max="40"> {{ state.gap }}px
      </label>
    </div>

    <!-- 演示区 / Demo area -->
    <div class="container" :style="containerStyle">
      <div v-for="n in 7" :key="n" class="item" :style="{ height: `${30 + (n % 3) * 20}px` }">
        {{ n }}
      </div>
    </div>

    <pre class="css">{{ cssText }}</pre>
  </div>
</template>

<script setup lang="ts">
// 容器属性共 7 个(+ display)/ 7 container properties (+ display):
// flex-direction, flex-wrap, flex-flow(简写/shorthand), justify-content,
// align-items, align-content, gap(row-gap / column-gap)
const props = [
  { name: 'flex-direction', values: ['row', 'row-reverse', 'column', 'column-reverse'] },
  { name: 'flex-wrap', values: ['nowrap', 'wrap', 'wrap-reverse'] },
  // 主轴对齐 / main-axis alignment
  { name: 'justify-content', values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
  // 交叉轴对齐(单行)/ cross-axis alignment (per line)
  { name: 'align-items', values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] },
  // 多行整体在交叉轴的对齐,仅在 wrap 且有多行时生效 / only works with multiple lines
  { name: 'align-content', values: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
] as const

const state = reactive<Record<string, string | number>>({
  'flex-direction': 'row',
  'flex-wrap': 'wrap',
  'justify-content': 'flex-start',
  'align-items': 'stretch',
  'align-content': 'stretch',
  'gap': 8,
})

const containerStyle = computed(() => ({
  'display': 'flex',
  'flex-direction': state['flex-direction'],
  'flex-wrap': state['flex-wrap'],
  'justify-content': state['justify-content'],
  'align-items': state['align-items'],
  'align-content': state['align-content'],
  'gap': `${state.gap}px`,
}))

const cssText = computed(() =>
  Object.entries(containerStyle.value).map(([k, v]) => `${k}: ${v};`).join('\n'),
)
</script>

<style scoped>
.tip { color: #666; }
.panel { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
.panel label { display: flex; flex-direction: column; font-size: 12px; }
.container {
  width: 100%;
  height: 320px;
  border: 1px dashed #999;
  background: #f9f9f9;
}
.item {
  min-width: 70px;
  padding: 0 12px;
  background: #42b883;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.css { margin-top: 16px; padding: 12px; background: #2d2d2d; color: #eee; }
</style>
