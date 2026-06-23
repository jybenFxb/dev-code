import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const userInfo = ref({ name: '管理员', role: 'admin', avatar: '' })
  const isLoggedIn = computed(() => !!token.value)

  function initFromStorage() {
    if (import.meta.client) {
      token.value = localStorage.getItem('crm_token') || ''
    }
  }

  function login(username: string, password: string): boolean {
    if (username && password) {
      token.value = 'mock-token-' + Date.now()
      if (import.meta.client) {
        localStorage.setItem('crm_token', token.value)
      }
      return true
    }
    return false
  }

  function logout() {
    token.value = ''
    if (import.meta.client) {
      localStorage.removeItem('crm_token')
    }
  }

  return { token, userInfo, isLoggedIn, initFromStorage, login, logout }
})