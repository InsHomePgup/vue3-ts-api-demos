import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Todo {
  id: number
  title: string
  done: boolean
}

// setup 风格的 store：写法和组合式 API 一致，类型全部自动推断，不需要 this
export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const doneCount = computed(() => todos.value.filter(t => t.done).length)

  function add(title: string): void {
    todos.value.push({ id: Date.now(), title, done: false })
  }

  function toggle(id: number): void {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.done = !todo.done
    }
  }

  return { todos, doneCount, add, toggle }
})
