<template>
  <div class="p-5">
    <n-space vertical :size="16">
      <n-h3 class="!m-0">
        Flex 属性演示 / Flex playground
      </n-h3>
      <n-text depth="3">
        上方调节容器和子项的属性,下方实时查看效果。
        / Tune container and item properties above, see the result below.
      </n-text>

      <!-- 上:两个属性面板 / Top: two property panels -->
      <n-grid :cols="2" :xGap="16" :yGap="16" responsive="screen" itemResponsive>
        <!-- 容器面板 / Container panel -->
        <n-gi span="2 l:1">
          <n-card size="small" title="容器属性 / Container">
            <n-space vertical :size="14">
              <div v-for="p in containerProps" :key="p.name">
                <n-space align="start" :wrap="false">
                  <n-text code class="inline-block w-36 shrink-0">
                    {{ p.name }}
                  </n-text>
                  <n-radio-group v-model:value="container[p.name]" size="small">
                    <n-space :size="[12, 4]">
                      <n-radio v-for="v in Object.keys(p.values)" :key="v" :value="v" :label="v" />
                    </n-space>
                  </n-radio-group>
                </n-space>
                <!-- 当前所选值的含义 / meaning of the selected value -->
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ p.values[container[p.name] ?? ''] }}
                </n-text>
              </div>

              <n-space align="center" :wrap="false">
                <n-text code class="inline-block w-36">
                  gap
                </n-text>
                <n-slider v-model:value="gap" :min="0" :max="40" class="w-60" />
                <n-text>{{ gap }}px</n-text>
              </n-space>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    height
                  </n-text>
                  <n-switch v-model:value="heightAuto" size="small">
                    <template #checked>
                      auto
                    </template>
                    <template #unchecked>
                      fixed
                    </template>
                  </n-switch>
                  <n-slider v-model:value="stageHeight" :min="60" :max="500" :disabled="heightAuto" class="w-48" />
                  <n-text>{{ heightAuto ? 'auto' : `${stageHeight}px` }}</n-text>
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ heightAuto ? containerHeightDesc.auto : containerHeightDesc.fixed }}
                </n-text>
              </div>

              <n-space align="center" :wrap="false">
                <n-text class="inline-block w-36">
                  子项数量 / items
                </n-text>
                <n-input-number v-model:value="count" :min="1" :max="12" size="small" />
              </n-space>
            </n-space>
          </n-card>
        </n-gi>

        <!-- 子项面板 / Item panel -->
        <n-gi span="2 l:1">
          <n-card size="small" title="子项属性 / Item">
            <n-space vertical :size="14">
              <n-space align="center" :wrap="false">
                <n-text class="inline-block w-36">
                  目标子项 / target
                </n-text>
                <n-select v-model:value="target" :options="targetOptions" size="small" class="w-28" />
                <n-text depth="3" class="text-xs">
                  每个子项的设置会各自保留 / each item keeps its own settings
                </n-text>
              </n-space>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    order
                  </n-text>
                  <n-input-number v-model:value="cur.order" size="small" />
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ itemDesc.order }}
                </n-text>
              </div>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    flex-grow
                  </n-text>
                  <n-input-number v-model:value="cur.grow" :min="0" size="small" />
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ itemDesc.grow }}
                </n-text>
              </div>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    flex-shrink
                  </n-text>
                  <n-input-number v-model:value="cur.shrink" :min="0" size="small" />
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ itemDesc.shrink }}
                </n-text>
              </div>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    flex-basis
                  </n-text>
                  <n-auto-complete
                    v-model:value="cur.basis"
                    :options="basisOptions"
                    size="small"
                    placeholder="auto / 100px / 30%"
                    class="w-40"
                  />
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ itemDesc.basis }}
                </n-text>
              </div>

              <div v-for="h in heightFields" :key="h.key">
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    {{ h.name }}
                  </n-text>
                  <n-auto-complete
                    v-model:value="cur[h.key]"
                    :options="h.options"
                    size="small"
                    :placeholder="h.placeholder"
                    class="w-40"
                  />
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ h.desc }}
                </n-text>
              </div>

              <div>
                <n-space align="center" :wrap="false">
                  <n-text code class="inline-block w-36">
                    align-self
                  </n-text>
                  <n-radio-group v-model:value="cur.alignSelf" size="small">
                    <n-space :size="[12, 4]">
                      <n-radio v-for="v in Object.keys(alignSelfDesc)" :key="v" :value="v" :label="v" />
                    </n-space>
                  </n-radio-group>
                </n-space>
                <n-text depth="3" class="mt-1 block text-xs">
                  {{ alignSelfDesc[cur.alignSelf] }}
                </n-text>
              </div>

              <n-space>
                <n-button size="small" @click="resetItem">
                  重置当前子项 / Reset item
                </n-button>
                <n-button size="small" @click="resetAll">
                  全部重置 / Reset all
                </n-button>
              </n-space>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- 提示 / Hints -->
      <n-alert v-if="container['flex-wrap'] === 'nowrap'" type="info" :showIcon="false">
        当前 nowrap:只有一行,align-content 不起作用;子项放不下时 flex-shrink 才会生效。
        / nowrap: a single line, so align-content has no effect; flex-shrink applies when items overflow.
      </n-alert>
      <n-alert v-else type="info" :showIcon="false">
        当前 {{ container['flex-wrap'] }}:放不下的子项会换行,所以 flex-shrink 基本看不出;想看 shrink 请切到 nowrap。
        / {{ container['flex-wrap'] }}: items wrap instead of shrinking; switch to nowrap to see flex-shrink.
      </n-alert>

      <!-- 下:表现区 / Bottom: live result -->
      <div class="stage" :style="containerStyle as CSSProperties">
        <div
          v-for="n in count"
          :key="n"
          class="item"
          :class="{ active: n === target }"
          :style="itemStyle(n)"
          @click="target = n"
        >
          {{ n }}
        </div>
      </div>

      <n-grid :cols="2" :xGap="16" :yGap="16" responsive="screen" itemResponsive>
        <n-gi span="2 l:1">
          <n-card size="small" title="容器 CSS / Container CSS">
            <n-code :code="containerCss" language="css" />
          </n-card>
        </n-gi>
        <n-gi span="2 l:1">
          <n-card size="small" :title="`子项 ${target} CSS / Item ${target} CSS`">
            <n-code :code="itemCss" language="css" />
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

// 容器属性 / container properties:
// flex-direction, flex-wrap, flex-flow(简写/shorthand), justify-content,
// align-items, align-content, gap(row-gap / column-gap)
const containerProps: { name: string, values: Record<string, string> }[] = [
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
  // 主轴对齐(每一行各自生效)/ main-axis alignment (applied to each line)
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
  // 交叉轴对齐:子项在自己那一行内 / cross-axis alignment of items within their own line
  {
    name: 'align-items',
    values: {
      'stretch': '子项没设高度时拉伸占满这一行的交叉轴(默认)/ fill the line if no cross size is set (default)',
      'flex-start': '子项在每一行内靠交叉轴起点 / aligned to the cross-start of its line',
      'flex-end': '子项在每一行内靠交叉轴终点 / aligned to the cross-end of its line',
      'center': '子项在每一行内沿交叉轴居中 / centered on the cross axis within its line',
      'baseline': '按文字基线对齐 / aligned by text baselines',
    },
  },
  // 交叉轴对齐:多行整体,仅在 wrap 且有多行时生效 / lines as a whole, only with wrap and multiple lines
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

// 子项属性 / item properties:
// order, flex-grow, flex-shrink, flex-basis, flex(简写/shorthand), align-self
const itemDesc = {
  order: '排列顺序,数值越小越靠前,默认 0;只改显示顺序,不改 DOM 顺序 / smaller first (default 0); visual order only',
  grow: '有剩余空间时的放大比例,默认 0 不放大;多个子项按比例分剩余空间 / share of free space (default 0 = no growth)',
  shrink: '空间不足时的缩小比例,默认 1;设为 0 则不被压缩(需 nowrap)/ shrink ratio when overflowing (default 1; 0 = never shrink, needs nowrap)',
  basis: '子项在主轴方向的初始大小,默认 auto(取 width/height 或内容);grow/shrink 都是在它的基础上分配 / initial main size (default auto); grow/shrink work from it',
}
const alignSelfDesc: Record<string, string> = {
  'auto': '跟随容器的 align-items(默认)/ follow the container align-items (default)',
  'stretch': '拉伸占满这一行的交叉轴 / stretch to fill the line',
  'flex-start': '只让自己靠交叉轴起点 / this item at cross-start',
  'flex-end': '只让自己靠交叉轴终点 / this item at cross-end',
  'center': '只让自己沿交叉轴居中 / this item centered',
  'baseline': '只让自己按基线对齐 / this item aligned by baseline',
}
// 高度相关(row 时高度在交叉轴上)/ height-related (cross axis when direction is row)
const containerHeightDesc = {
  auto: 'auto:容器高度由各行高度之和(加 gap)撑开,没有剩余空间,所以 align-content 看不出效果 / height comes from the lines (plus gap), no free space, so align-content has no effect',
  fixed: '固定高度:容器有剩余空间时 align-content 才有的分;nowrap 单行时这一行就占满容器高度 / with a fixed height, align-content can distribute free space; a single line fills the container',
}
const opts = (list: string[]) => list.map(v => ({ label: v, value: v }))
const heightFields = [
  {
    key: 'height' as const,
    name: 'height',
    placeholder: 'auto / 80px / 50%',
    options: opts(['auto', '40px', '80px', '120px', '50%']),
    desc: 'auto 时取内容高度,并被 align-items: stretch 拉到行高;设了固定值就不再被拉伸。百分比要求容器 height 不是 auto / auto uses content height and can be stretched; a fixed value is never stretched. Percentages need a non-auto container height',
  },
  {
    key: 'minHeight' as const,
    name: 'min-height',
    placeholder: '0 / 50px',
    options: opts(['0', '30px', '50px', '80px', '120px']),
    desc: '高度下限,优先于 stretch 和 height / lower bound, wins over stretch and height',
  },
  {
    key: 'maxHeight' as const,
    name: 'max-height',
    placeholder: 'none / 60px',
    options: opts(['none', '40px', '60px', '100px']),
    desc: '高度上限,stretch 也拉不过它 / upper bound, stretch cannot exceed it',
  },
]
const basisOptions = ['auto', '0', '60px', '120px', '30%'].map(v => ({ label: v, value: v }))

interface ItemCfg {
  order: number | null
  grow: number | null
  shrink: number | null
  basis: string
  height: string
  minHeight: string
  maxHeight: string
  alignSelf: string
}

function defaultContainer() {
  return {
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'align-content': 'stretch',
  }
}
// 每个子项默认的 min-height 不同,方便看出各行高度 / varied default min-height so lines have visible heights
function defaultItem(n: number): ItemCfg {
  return {
    order: 0,
    grow: 0,
    shrink: 1,
    basis: 'auto',
    height: 'auto',
    minHeight: `${30 + (n % 3) * 20}px`,
    maxHeight: 'none',
    alignSelf: 'auto',
  }
}

const MAX = 12
const container = reactive<Record<string, string>>(defaultContainer())
const gap = ref(8)
const heightAuto = ref(false)
const stageHeight = ref(320)
const count = ref(8)
// 每个子项各自一份配置 / one config per item
const cfgs = reactive<ItemCfg[]>(Array.from({ length: MAX }, (_, i) => defaultItem(i + 1)))
const target = ref(2)
const cur = computed(() => cfgs[target.value - 1] as ItemCfg)
const targetOptions = computed(() => Array.from({ length: count.value }, (_, i) => ({ label: `子项 ${i + 1}`, value: i + 1 })))

// 子项数量减少后,目标不能越界 / keep target in range
watch(count, (c) => {
  if (target.value > c)
    target.value = c
})

function resetItem() {
  Object.assign(cur.value, defaultItem(target.value))
}
function resetAll() {
  Object.assign(container, defaultContainer())
  gap.value = 8
  heightAuto.value = false
  stageHeight.value = 320
  count.value = 8
  target.value = 2
  cfgs.forEach((c, i) => Object.assign(c, defaultItem(i + 1)))
}

const containerStyle = computed<Record<string, string | undefined>>(() => ({
  'display': 'flex',
  'flex-direction': container['flex-direction'],
  'flex-wrap': container['flex-wrap'],
  'justify-content': container['justify-content'],
  'align-items': container['align-items'],
  'align-content': container['align-content'],
  'gap': `${gap.value}px`,
  'height': heightAuto.value ? 'auto' : `${stageHeight.value}px`,
}))

function itemStyleOf(c: ItemCfg) {
  return {
    'order': c.order ?? 0,
    'flex-grow': c.grow ?? 0,
    'flex-shrink': c.shrink ?? 1,
    'flex-basis': c.basis || 'auto',
    'height': c.height || 'auto',
    'min-height': c.minHeight || '0',
    'max-height': c.maxHeight || 'none',
    'align-self': c.alignSelf,
  }
}
function itemStyle(n: number) {
  return itemStyleOf(cfgs[n - 1] as ItemCfg)
}

function toCss(o: Record<string, string | number | undefined>) {
  return Object.entries(o).map(([k, v]) => `${k}: ${v};`).join('\n')
}
const containerCss = computed(() => toCss(containerStyle.value))
const itemCss = computed(() => toCss(itemStyleOf(cur.value)))
</script>

<style scoped>
.stage {
  /* 宽度故意收窄:子项能折成多行(看 align-content),nowrap 时也放不下(看 shrink) */
  /* narrow on purpose: items wrap into lines (align-content) / overflow under nowrap (shrink) */
  width: 480px;
  max-width: 100%;
  border: 1px dashed #999;
  background: #f9f9f9;
}
.item {
  width: 64px;
  padding: 0 8px;
  background: #a0a0a0;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.item.active {
  background: #18a058;
}
</style>
