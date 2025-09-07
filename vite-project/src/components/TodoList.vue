<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'all'"
          :class="{ active: filterStatus === 'all' }"
          >全部</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'incomplete'"
          :class="{ active: filterStatus === 'incomplete' }"
          >待完成</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'completed'"
          :class="{ active: filterStatus === 'completed' }"
          >已完成</a
        >
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <!-- 新增toggle-todo-status -->
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @remove-todo="emit('remove-todo', $event)"
          @toggle-todo-status="emit('toggle-todo-status', $event)"
        >
        </TodoItem>
      </ul>
      <div class="todoList_statistics">
        <p>{{ incompleteTodos.length }} 個未完成項目</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TodoItem from './TodoItem.vue'
import { ref, computed } from 'vue'
const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

// 在 defineEmits 中新增 'toggle-todo-status'
const emit = defineEmits(['remove-todo', 'toggle-todo-status'])

const filterStatus = ref('all')
const filterTodos = computed(() => {
  switch (filterStatus.value) {
    case 'incomplete':
      return props.todos.filter((t) => !t.status)
    case 'completed':
      return props.todos.filter((t) => t.status)
    default:
      return props.todos
  }
})
const incompleteTodos = computed(() => props.todos.filter((t) => !t.status))
</script>
