import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import type { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
}

/**
 * 路由权限守卫
 * 未登录时重定向到 /login，并保存目标路径供登录后跳转
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
