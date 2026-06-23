import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  id: string
  name: string
  avatar: string
  role: 'admin' | 'viewer'
  token: string
}

interface UserStore {
  userInfo: UserInfo | null
  isLoggedIn: boolean
  login: (info: UserInfo) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoggedIn: false,
      login: (info: UserInfo) =>
        set({
          userInfo: info,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          userInfo: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'user-storage',
      // 只持久化 token 相关，敏感信息不存 localStorage
      partialize: (state) => ({
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)
