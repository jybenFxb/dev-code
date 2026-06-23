export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
  ],
  elementPlus: {
    importStyle: 'css',
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: 'CRM 管理系统',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },
})