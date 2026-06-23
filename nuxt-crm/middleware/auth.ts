export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem('crm_token')
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})