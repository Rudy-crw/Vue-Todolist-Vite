<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            v-model="nickname"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="password"
            placeholder="請輸入密碼"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="confirmPassword"
            placeholder="請再次輸入密碼"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            onclick="javascript:location.href='#todoListPage'"
            value="註冊帳號"
            @click="handleRegister"
          />
          <Router-link class="formControls_btnLink" to="login">登入</Router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { register } from '@/utils/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

//表單資料
const email = ref('')
const nickname = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  try {
    await register(email.value, password.value, nickname.value)
    alert('註冊成功！')
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message)
  }
}
</script>
