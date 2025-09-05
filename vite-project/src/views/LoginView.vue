<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            v-model="email"
            placeholder="請輸入 email"
            required
            @blur="validateEmail"
          />
          <span v-if="errors.email">{{ errors.email }}</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="password"
            @blur="validatePassword"
            placeholder="請輸入密碼"
            required
          />
          <span v-if="errors.password">{{ errors.password }}</span>
          <input
            class="formControls_btnSubmit"
            type="button"
            onclick="javascript:location.href='#todoListPage'"
            @click="handleLogin"
            value="登入"
            required
          />
          <Router-link class="formControls_btnLink" to="/register"> 註冊帳號</Router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../utils/api.js'
const router = useRouter()

// 表單資料
const email = ref('')
const password = ref('')
const errors = ref({
  email: '',
  password: '',
})

// 當 email 輸入框失去焦點時觸發
const validateEmail = () => {
  if (!email.value) {
    errors.value.email = '此欄位不可留空'
    console.log(errors.value.email)
  } else {
    errors.value.email = ''
  }
}

// 當 password 輸入框失去焦點時觸發
const validatePassword = () => {
  if (!password.value) {
    errors.value.password = '此欄位不可留空'
    console.log(errors.value.password)
  } else {
    errors.value.password = ''
  }
}

const handleLogin = async () => {
  try {
    const response = await login(email.value, password.value)
    const { token, exp } = response.data
    // 儲存 token
    document.cookie = `vue3-todolist-token=${token}; expires=${exp}`
    alert('登入成功！')
    router.push('/todolist')
  } catch (error) {
    alert(error.response.data.message)
  }
}
</script>
