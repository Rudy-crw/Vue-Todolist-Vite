import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

//  註冊
export const register = async (email, password, nickname) => {
  return api.post('/users/sign_up', { email, password, nickname })
}

// 登入
export const login = async (email, password) => {
  return api.post('/users/sign_in', { email, password })
}
//
// -----------------------------
// 登出 (新增)
export const logout = async () => {
  return api.post('/users/sign_out')
}

// 驗證 token 並取得使用者資料 (新增)
export const checkAuth = async () => {
  return api.get('/users/check')
}

// === 待辦事項 Todos (新增) ===
// 取得 todos
export const getTodos = async () => {
  return api.get('/todos')
}

// 新增 todo
export const addTodo = async (todo) => {
  return api.post('/todos', todo)
}

// 刪除 todo
export const deleteTodo = async (id) => {
  return api.delete(`/todos/${id}`)
}

// 切換 todo 狀態
export const toggleTodoStatus = async (id) => {
  return api.patch(`/todos/${id}/toggle`)
}
