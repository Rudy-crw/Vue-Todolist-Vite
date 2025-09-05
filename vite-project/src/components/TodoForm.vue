<template>
  <div class="inputBox">
    <input v-model="newTodo" type="text" placeholder="請輸入待辦事項" />
    <a href="#" @click="handleAddTodo">
      <i class="fa fa-plus"></i>
    </a>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const newTodo = ref('')

const emit = defineEmits(['add-todo'])
const handleAddTodo = () => {
  emit('add-todo', newTodo.value)
  newTodo.value = ''
}
</script>
