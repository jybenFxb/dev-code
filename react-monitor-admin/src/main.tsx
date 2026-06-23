import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { monitor } from './monitor'
import './index.css'

// 启动 MSW（始终启用，纯前端 Demo 无真实后端）
async function enableMocking() {
  const { worker } = await import('./mock/browser')
  return worker.start({
    onUnhandledRequest: 'bypass', // 未匹配的请求正常放行
  })
}

// 初始化监控 SDK
monitor.init({
  reportUrl: '/api/monitor/report',
  appId: 'react-monitor-admin',
  batchSize: 10,
  flushInterval: 5000,
  sampleRate: 1,
  enableError: true,
  enablePerformance: true,
  enableBehavior: true,
})

// 先启动 MSW，再渲染应用（保证首屏请求能被拦截）
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
