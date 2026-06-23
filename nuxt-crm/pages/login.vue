<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">CRM 管理系统</h2>
      <el-form :model="loginForm" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password @keyup.enter="handleLogin" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const loginForm = reactive({ username: 'admin', password: '123456' })
const loading = ref(false)

const handleLogin = () => {
  loading.value = true
  setTimeout(() => {
    const success = authStore.login(loginForm.username, loginForm.password)
    loading.value = false
    if (success) {
      ElMessage.success('登录成功')
      navigateTo('/dashboard')
    } else {
      ElMessage.error('用户名或密码不能为空')
    }
  }, 500)
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1f2e 0%, #2d3561 100%);
}
.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}
.login-btn {
  width: 100%;
}
</style>