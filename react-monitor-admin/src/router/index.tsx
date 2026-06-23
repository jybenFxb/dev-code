import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import { AuthGuard } from './AuthGuard'
import { MainLayout } from '@/components/Layout/MainLayout'

const LoginPage = lazy(() => import('@/pages/login/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const ErrorsPage = lazy(() => import('@/pages/monitor/errors/ErrorsPage'))
const PerformancePage = lazy(() => import('@/pages/monitor/performance/PerformancePage'))
const BehaviorPage = lazy(() => import('@/pages/monitor/behavior/BehaviorPage'))

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" tip="加载中..." />
  </div>
)

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(LoginPage),
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: withSuspense(DashboardPage),
      },
      {
        path: 'monitor/errors',
        element: withSuspense(ErrorsPage),
      },
      {
        path: 'monitor/performance',
        element: withSuspense(PerformancePage),
      },
      {
        path: 'monitor/behavior',
        element: withSuspense(BehaviorPage),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
