<template>
  <div class="p-5">
    <n-space vertical :size="16">
      <n-h3 class="!m-0">
        Flex 子项属性 / Flex item properties
      </n-h3>
      <n-text depth="3">
        选中一个子项,修改它自己的属性;其余子项保持默认。
        / Pick an item and edit its own properties; the others keep defaults.
      </n-text>

      <n-card size="small" title="属性 / Properties">
        <n-form labelPlacement="left" labelWidth="150" size="small">
          <n-form-item label="目标子项 / target">
            <n-radio-group v-model:value="target">
              <n-radio-button v-for="n in 5" :key="n" :value="n" :label="String(n)" />
            </n-radio-group>
          </n-form-item>
          <n-form-item label="order">
            <n-input-number v-model:value="cfg.order" />
          </n-form-item>
          <n-form-item label="flex-grow">
            <n-input-number v-model:value="cfg.grow" :min="0" />
          </n-form-item>
          <n-form-item label="flex-shrink">
            <n-input-number v-model:value="cfg.shrink" :min="0" />
          </n-form-item>
          <n-form-item label="flex-basis">
            <n-auto-complete
              v-model:value="cfg.basis"
              :options="basisOptions"
              placeholder="auto / 100px / 30%"
              class="w-48"
            />
          </n-form-item>
          <n-form-item label="align-self">
            <n-radio-group v-model:value="cfg.alignSelf">
              <n-radio-button v-for="v in alignSelfValues" :key="v" :value="v" :label="v" />
            </n-radio-group>
          </n-form-item>
          <n-button size="small" @click="reset">
            重置 / Reset
          </n-button>
        </n-form>
      </n-card>

      <!-- 容器宽度故意偏小,便于观察 shrink / container is narrow on purpose to show shrink -->
      <div class="container">
        <div v-for="n in 5" :key="n" class="item" :class="{ active: n === target }" :style="n === target ? itemStyle : undefined">
          {{ n }}
        </div>
      </div>

      <n-card size="small" title="CSS">
        <n-code :code="cssText" language="css" />
      </n-card>
    </n-space>
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
const basisOptions = ['auto', '0', '100px', '200px', '30%'].map(v => ({ label: v, value: v }))

function defaults() {
  return {
    order: 0,
    grow: 0,
    shrink: 1,
    basis: 'auto',
    alignSelf: 'auto',
  }
}

const target = ref(2)
const cfg = reactive(defaults())

function reset() {
  Object.assign(cfg, defaults())
}

const itemStyle = computed(() => ({
  'order': cfg.order ?? 0,
  'flex-grow': cfg.grow ?? 0,
  'flex-shrink': cfg.shrink ?? 1,
  'flex-basis': cfg.basis || 'auto',
  'align-self': cfg.alignSelf,
}))

const cssText = computed(() =>
  `/* item ${target.value} */\n${Object.entries(itemStyle.value).map(([k, v]) => `${k}: ${v};`).join('\n')}`,
)
</script>

<style scoped>
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
  background: #a0a0a0;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid #fff;
}
.item.active {
  background: #18a058;
}
</style>
