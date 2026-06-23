import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { router } from '@/router'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#1677ff' } }}>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  )
}
