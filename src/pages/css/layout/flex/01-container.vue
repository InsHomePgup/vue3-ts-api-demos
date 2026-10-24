<template>
  <div class="p-5">
    <n-space vertical :size="16">
      <n-h3 class="!m-0">
        Flex 容器属性 / Flex container properties
      </n-h3>
      <n-text depth="3">
        切换下面的属性,观察容器内子项的变化。 / Change the properties below and watch the items.
      </n-text>

      <!-- 控制面板 / Control panel -->
      <n-card size="small" title="属性 / Properties">
        <n-space vertical :size="14">
          <div v-for="p in props" :key="p.name">
            <n-space align="center" :wrap="false">
              <n-text code class="inline-block w-40">
                {{ p.name }}
              </n-text>
              <n-radio-group v-model:value="state[p.name]" size="small">
                <n-radio-button v-for="v in Object.keys(p.values)" :key="v" :value="v" :label="v" />
              </n-radio-group>
            </n-space>
            <!-- 当前所选值的含义 / meaning of the selected value -->
            <n-text depth="3" class="mt-1 block pl-40 text-xs">
              {{ p.values[state[p.name] ?? ''] }}
            </n-text>
          </div>

          <n-space align="center" :wrap="false">
            <n-text code class="inline-block w-40">
              gap
            </n-text>
            <n-slider v-model:value="gap" :min="0" :max="40" class="w-60" />
            <n-text>{{ gap }}px</n-text>
          </n-space>

          <n-space align="center" :wrap="false">
            <n-text code class="inline-block w-40">
              子项数量 / items
            </n-text>
            <n-input-number v-model:value="count" :min="1" :max="12" size="small" />
          </n-space>

          <n-button size="small" @click="reset">
            重置 / Reset
          </n-button>
        </n-space>
      </n-card>

      <!-- align-content 仅在 wrap 且出现多行时生效 / only effective with wrap and multiple lines -->
      <n-alert v-if="state['flex-wrap'] === 'nowrap'" type="warning" :showIcon="false">
        当前 flex-wrap: nowrap,只有一行,align-content 不起作用。
        / flex-wrap is nowrap (single line), so align-content has no effect.
      </n-alert>

      <!-- 演示区 / Demo area -->
      <div class="container" :style="containerStyle as CSSProperties">
        <div v-for="n in count" :key="n" class="item" :style="{ height: `${30 + (n % 3) * 20}px` }">
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
import type { CSSProperties } from 'vue'

// 容器属性共 7 个(+ display)/ 7 container properties (+ display):
// flex-direction, flex-wrap, flex-flow(简写/shorthand), justify-content,
// align-items, align-content, gap(row-gap / column-gap)
const props: { name: string, values: Record<string, string> }[] = [
  {
    name: 'flex-direction',
    values: {
      'row': '主轴水平,从左到右(默认)/ main axis horizontal, left to right (default)',
      'row-reverse': '主轴水平,从右到左 / horizontal, right to left',
      'column': '主轴竖直,从上到下 / main axis vertical, top to bottom',
      'column-reverse': '主轴竖直,从下到上 / vertical, bottom to top',
    },
  },
  {
    name: 'flex-wrap',
    values: {
      'nowrap': '不换行,只有一行,子项会被压缩(默认)/ single line, items shrink (default)',
      'wrap': '放不下就换行,新行在交叉轴方向往后排 / wrap onto new lines, stacking toward cross-end',
      'wrap-reverse': '换行,但新行排在前面(交叉轴反向)/ wrap, new lines stack toward cross-start',
    },
  },
  // 主轴对齐 / main-axis alignment
  {
    name: 'justify-content',
    values: {
      'flex-start': '子项靠主轴起点,剩余空间在末尾(默认)/ pack at main-start, free space at the end (default)',
      'flex-end': '子项靠主轴终点,剩余空间在开头 / pack at main-end',
      'center': '子项整体居中,两端留白相等 / centered, equal free space on both ends',
      'space-between': '首尾子项贴边,剩余空间只分给子项之间 / first/last touch the edges, space only between items',
      'space-around': '每个子项两侧留相等空白,所以两端空白是中间的一半 / equal space around each item (edges get half)',
      'space-evenly': '所有间隙(含两端)完全相等 / all gaps, including the edges, are identical',
    },
  },
  // 交叉轴对齐(单行)/ cross-axis alignment (per line)
  {
    name: 'align-items',
    values: {
      'stretch': '子项没设高度时拉伸占满这一行的交叉轴(默认);本例子项有固定高度,所以看不出拉伸 / fill the line if no cross size is set (default); items here have fixed heights',
      'flex-start': '子项在每一行内靠交叉轴起点 / aligned to the cross-start of its line',
      'flex-end': '子项在每一行内靠交叉轴终点 / aligned to the cross-end of its line',
      'center': '子项在每一行内沿交叉轴居中 / centered on the cross axis within its line',
      'baseline': '按文字基线对齐 / aligned by text baselines',
    },
  },
  // 多行整体在交叉轴的对齐,仅在 wrap 且有多行时生效 / only works with multiple lines
  {
    name: 'align-content',
    values: {
      'stretch': '多行平分交叉轴剩余空间,每行被撑高(默认)/ lines share the free cross space and grow (default)',
      'flex-start': '所有行挤在交叉轴起点,剩余空间在末尾 / lines packed at cross-start',
      'flex-end': '所有行挤在交叉轴终点 / lines packed at cross-end',
      'center': '所有行整体居中 / lines packed in the center',
      'space-between': '首行、末行贴边,剩余空间分给行与行之间 / first/last lines at the edges, space between lines',
      'space-around': '每行两侧留相等空白(两端为中间的一半)/ equal space around each line (edges get half)',
      'space-evenly': '行与行、行与边缘的间隙完全相等 / all gaps between lines and edges are identical',
    },
  },
]

function defaults() {
  return {
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'align-content': 'stretch',
  }
}

const state = reactive<Record<string, string>>(defaults())
const gap = ref(8)
const count = ref(7)

function reset() {
  Object.assign(state, defaults())
  gap.value = 8
  count.value = 7
}

const containerStyle = computed<Record<string, string | undefined>>(() => ({
  'display': 'flex',
  'flex-direction': state['flex-direction'],
  'flex-wrap': state['flex-wrap'],
  'justify-content': state['justify-content'],
  'align-items': state['align-items'],
  'align-content': state['align-content'],
  'gap': `${gap.value}px`,
}))

const cssText = computed(() =>
  Object.entries(containerStyle.value).map(([k, v]) => `${k}: ${v};`).join('\n'),
)
</script>

<style scoped>
.container {
  /* 宽度故意收窄,让子项折成多行,才能看出 align-content / narrow on purpose so items wrap into several lines */
  width: 360px;
  max-width: 100%;
  height: 320px;
  border: 1px dashed #999;
  background: #f9f9f9;
}
.item {
  min-width: 70px;
  padding: 0 12px;
  background: #18a058;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
