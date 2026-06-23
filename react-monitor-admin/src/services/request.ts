import axios from 'axios'

const request = axios.create({
  timeout: 10_000,
})

// 请求拦截：自动带 token
request.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user-storage')
  if (stored) {
    try {
      const { state } = JSON.parse(stored) as { state: { userInfo: { token: string } | null } }
      if (state.userInfo?.token) {
        config.headers.Authorization = `Bearer ${state.userInfo.token}`
      }
    } catch {
      // 忽略解析错误
    }
  }
  return config
})

// 响应拦截：统一处理业务错误码
request.interceptors.response.use(
  (res) => {
    if (res.data.code !== undefined && res.data.code !== 0) {
      return Promise.reject(new Error(res.data.message ?? '请求失败'))
    }
    return res
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user-storage')
      window.location.href = '/login'
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  }
)

export default request
