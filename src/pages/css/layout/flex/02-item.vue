<template>
  <div class="p-5">
    <h3>Flex 子项属性 / Flex item properties</h3>
    <p class="tip">
      选中一个子项,修改它自己的属性;其余子项保持默认。
      / Pick an item and edit its own properties; the others keep defaults.
    </p>

    <div class="panel">
      <label>
        目标子项 / target
        <select v-model.number="target">
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>
      <label>
        <code>order</code>
        <input v-model.number="cfg.order" type="number">
      </label>
      <label>
        <code>flex-grow</code>
        <input v-model.number="cfg.grow" type="number" min="0">
      </label>
      <label>
        <code>flex-shrink</code>
        <input v-model.number="cfg.shrink" type="number" min="0">
      </label>
      <label>
        <code>flex-basis</code>
        <input v-model="cfg.basis" placeholder="auto / 100px / 30%">
      </label>
      <label>
        <code>align-self</code>
        <select v-model="cfg.alignSelf">
          <option v-for="v in alignSelfValues" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>
    </div>

    <!-- 容器宽度故意偏小,便于观察 shrink / container is narrow on purpose to show shrink -->
    <div class="container">
      <div v-for="n in 5" :key="n" class="item" :style="n === target ? itemStyle : undefined">
        {{ n }}
      </div>
    </div>

    <pre class="css">{{ cssText }}</pre>
  </div>
</template>

<script setup lang="ts">
// 子项属性共 6 个 / 6 item properties:
// order           排列顺序,越小越靠前 / display order, smaller first
// flex-grow       有剩余空间时的放大比例 / share of free space (default 0)
// flex-shrink     空间不足时的缩小比例 / shrink ratio when overflowing (default 1)
// flex-basis      主轴方向的初始大小 / initial main size (default auto)
// flex            grow shrink basis 的简写 / shorthand, e.g. flex: 1 === 1 1 0%
// align-self      覆盖容器的 align-items / overrides container align-items
const alignSelfValues = ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline']

const target = ref(2)
const cfg = reactive({
  order: 0,
  grow: 0,
  shrink: 1,
  basis: 'auto',
  alignSelf: 'auto',
})

const itemStyle = computed(() => ({
  'order': cfg.order,
  'flex-grow': cfg.grow,
  'flex-shrink': cfg.shrink,
  'flex-basis': cfg.basis || 'auto',
  'align-self': cfg.alignSelf,
}))

const cssText = computed(() =>
  `/* item ${target.value} */\n${Object.entries(itemStyle.value).map(([k, v]) => `${k}: ${v};`).join('\n')}`,
)
</script>

<style scoped>
.tip { color: #666; }
.panel { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
.panel label { display: flex; flex-direction: column; font-size: 12px; }
.panel input { width: 110px; }
.container {
  display: flex;
  align-items: flex-start;
  width: 500px;
  max-width: 100%;
  height: 200px;
  border: 1px dashed #999;
  background: #f9f9f9;
}
.item {
  width: 120px; /* 5 × 120 > 500,默认会被压缩 / overflows, so items shrink */
  height: 60px;
  background: #42b883;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid #fff;
}
.css { margin-top: 16px; padding: 12px; background: #2d2d2d; color: #eee; }
</style>
