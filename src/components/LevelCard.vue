<template>
  <div class="border rounded p-4 w-64 min-h-48 bg-white shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium">
        {{ title }}
      </h3>
      <button
        :disabled="disabled"
        class="rounded px-2 py-1 text-sm bg-blue-100 hover:bg-blue-200 disabled:opacity-50"
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
            class="p-2 mb-1 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div class="flex items-center gap-2 w-full">
              <input
                v-model="element.name"
                type="text"
                class="bg-transparent focus:outline-none flex-1"
                :class="{ 'text-red-500': element.name.trim() === '' }"
                placeholder="输入选项名称"
                @blur="validateInput(element)"
              />
              <button
                class="text-red-400 hover:text-red-600 transition-colors"
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

const emit = defineEmits(['update:model-value'])

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
  emit('update:model-value', newItems)
}

function removeItem(index: number) {
  const newItems = [...props.modelValue]
  newItems.splice(index, 1)
  emit('update:model-value', newItems)
}

function handleDragEnd(newValue: LevelItem[]) {
  emit('update:model-value', newValue)
}
</script>
