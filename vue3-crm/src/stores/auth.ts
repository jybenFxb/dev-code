import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref({ name: '管理员', role: 'admin', avatar: '' })

  const isLoggedIn = computed(() => !!token.value)

  function login(username: string, password: string) {
    // 模拟登录
    if (username && password) {
      token.value = 'mock-token-' + Date.now()
      localStorage.setItem('token', token.value)
      return true
    }
    return false
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }

  return { token, userInfo, isLoggedIn, login, logout }
})