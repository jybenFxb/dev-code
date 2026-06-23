import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { monitor } from '@/monitor'

/**
 * 自动追踪页面访问（PV）
 * 在 Layout 组件中使用，路由变化时自动上报
 */
export function usePageView() {
  const location = useLocation()

  useEffect(() => {
    monitor.track('page_view', `访问页面: ${location.pathname}`, {
      path: location.pathname,
      search: location.search,
    })
  }, [location.pathname, location.search])
}
