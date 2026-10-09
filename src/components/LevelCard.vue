<template>
  <div class="min-h-48 w-64 border rounded bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="font-medium">
        {{ title }}
      </h3>
      <button
        :disabled="disabled"
        class="rounded bg-blue-100 px-2 py-1 text-sm hover:bg-blue-200 disabled:opacity-50"
        @click="addItem"
      >
        + 添加
      </button>
    </div>
    <div v-if="modelValue.length > 0">
      <Draggable
        :modelValue="modelValue"
        itemKey="id"
        class="space-y-2"
        @update="handleDragEnd"
      >
        <template #item="{ element, index }">
          <div
            class="mb-1 cursor-pointer border-b p-2 hover:bg-gray-50"
          >
            <div class="w-full flex items-center gap-2">
              <input
                v-model="element.name"
                type="text"
                class="flex-1 bg-transparent focus:outline-none"
                :class="{ 'text-red-500': element.name.trim() === '' }"
                placeholder="输入选项名称"
                @blur="validateInput(element)"
              />
              <button
                class="text-red-400 transition-colors hover:text-red-600"
                @click.stop="removeItem(index)"
              >
                ×
              </button>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <div v-else class="text-sm text-gray-400">
      点击添加创建新选项
    </div>
  </div>
</template>

<script setup lang="ts">
interface LevelItem {
  id: string
  name: string
  children: LevelItem[]
}

const props = defineProps({
  title: { type: String, required: true },
  modelValue: { type: Array as () => LevelItem[], required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const generateId = () => Math.random().toString(36).substr(2, 9)

function validateInput(item: LevelItem) {
  if (item.name.trim() === '') {
    item.name = '未命名选项'
  }
}

function addItem() {
  const newItems = [...props.modelValue]
  newItems.push({
    id: generateId(),
    name: '新选项',
    children: [],
  })
  emit('update:modelValue', newItems)
}

function removeItem(index: number) {
  const newItems = [...props.modelValue]
  newItems.splice(index, 1)
  emit('update:modelValue', newItems)
}

function handleDragEnd(newValue: LevelItem[]) {
  emit('update:modelValue', newValue)
}
</script>
