<template>
  <li>
    <label class="todoList_label">
      <input
        class="todoList_input"
        type="checkbox"
        value="true"
        :checked="todo.status"
        @change="handleToggleStatus(todo.id)"
      />
      <span>{{ todo.content }}</span>
    </label>
    <a href="#" @click.prevent="handleRemoveTodo(todo.id)">
      <i class="fa fa-times"></i>
    </a>
  </li>
</template>
<script setup>
const props = defineProps({
  todo: { type: Object, required: true },
})

// 在 defineEmits 中新增 'toggle-todo-status' 事件
const emit = defineEmits(['remove-todo', 'toggle-todo-status'])
const handleRemoveTodo = (id) => {
  emit('remove-todo', id)
}

// 新增 handleToggleStatus 函式，用於發出事件
const handleToggleStatus = (id) => {
  emit('toggle-todo-status', id)
}
</script>
