<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#todolist"
            ><span>{{ nickname }} 的代辦</span></a
          >
        </li>
        <li><a href="#" @click.prevent="handleLogout">登出</a></li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
      <div class="todoList_Content">
        <TodoForm @add-todo="handleAddTodo"></TodoForm>
        <TodoList
          v-if="todos.length"
          :todos="todos"
          @remove-todo="handleRemoveTodo"
          @toggle-todo-status="handleToggleStatus"
        ></TodoList>
        <p v-else>尚無代辦事項</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // 引入 useRouter
// 引入所有需要用到的 API 函式
import { getTodos, addTodo, deleteTodo, toggleTodoStatus, logout } from '@/utils/api.js'

const router = useRouter() // 取得 router 實例

// 移除靜態資料，改為一個空的 ref，準備接收伺服器資料
const todos = ref([])
// { id: 1, content: '把冰箱發霉的檸檬拿去丟', status: false },
// { id: 2, content: '打電話叫媽媽匯款給我', status: true },

const nickname = ref('') // 新增一個 ref 來存放暱稱

// 修正: 建立一個統一的函式來清除所有使用者資料
const clearUserData = () => {
  document.cookie = 'vue3-todolist-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  localStorage.removeItem('nickname')
}

// 畫面載入時執行的邏輯
onMounted(() => {
  // 從 localStorage 讀取暱稱並顯示
  const storedNickname = localStorage.getItem('nickname')
  if (storedNickname) {
    nickname.value = storedNickname
  } else {
    // 如果 localStorage 沒有暱稱，代表狀態異常，直接登出
    alert('無法獲取使用者資訊，請重新登入。')
    clearUserData()
    router.push('/login')
    return // 停止後續執行
  }

  // 接著嘗試取得 todos
  fetchTodos()
})

const fetchTodos = async () => {
  try {
    const response = await getTodos()
    todos.value = response.data.data.reverse()
  } catch (error) {
    // 如果 getTodos 失敗 (通常是 401 錯誤)，代表 token 無效
    console.error('取得 todos 失敗:', error)
    alert('您的登入憑證已失效，請重新登入。')
    clearUserData()
    router.push('/login')
  }
}

// 新增登出處理函式
const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('後端登出 API 呼叫失敗:', error)
  } finally {
    alert('您已成功登出！')
    clearUserData() // 使用統一的清除函式
    router.push('/login')
  }
}

// 修改 addTodo 為 handleAddTodo，讓它去呼叫 API
// const addTodo = (content) => {
//   if (content.trim() !== '') {
//     todos.value.push({
//       id: Date.now(),
//       content,
//       status: false,
//     })
//   }
// }
const handleAddTodo = async (content) => {
  if (content.trim() !== '') {
    try {
      // API 需要的格式是 { "content": "..." }
      await addTodo({ content: content })
      await fetchTodos() // 新增成功後，重新獲取一次列表以同步畫面
    } catch (error) {
      console.error('新增 todo 失敗:', error)
      alert(error.response.data.message || '新增失敗')
    }
  }
}
// 修改 removeTodo 為 handleRemoveTodo，讓它去呼叫 API

// const removeTodo = (id) => {
//   todos.value = todos.value.filter((t) => t.id !== id)
// }
const handleRemoveTodo = async (id) => {
  try {
    await deleteTodo(id)
    await fetchTodos() // 刪除成功後，重新獲取一次列表
  } catch (error) {
    console.error('刪除 todo 失敗:', error)
    alert(error.response.data.message || '刪除失敗')
  }
}

// 新增 handleToggleStatus 函式，讓它去呼叫 API
const handleToggleStatus = async (id) => {
  try {
    await toggleTodoStatus(id)
    await fetchTodos() // 更新狀態成功後，重新獲取一次列表
  } catch (error) {
    console.error('更新狀態失敗:', error)
    alert(error.response.data.message || '更新失敗')
  }
}
</script>
