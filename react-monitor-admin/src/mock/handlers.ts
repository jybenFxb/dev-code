import { http, HttpResponse, delay } from 'msw'
import type { ErrorItem, PerformanceItem, BehaviorItem, DashboardStats } from '@/store/monitorStore'

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

function randomId() {
  return Math.random().toString(36).slice(2, 10)
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000
}

// ─── Mock 数据 ────────────────────────────────────────────────────────────────

const MOCK_ERRORS: ErrorItem[] = [
  {
    id: randomId(),
    message: "Cannot read properties of undefined (reading 'map')",
    stack: `TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (UserList.tsx:42:18)
    at renderWithHooks (react-dom.development.js:14985)`,
    url: '/user/list',
    timestamp: daysAgo(0),
    count: 127,
    lastSeen: Date.now() - 1000 * 60 * 5,
    errorType: 'js',
    status: 'open',
  },
  {
    id: randomId(),
    message: 'ChunkLoadError: Loading chunk 3 failed',
    url: '/dashboard',
    timestamp: daysAgo(1),
    count: 43,
    lastSeen: Date.now() - 1000 * 60 * 30,
    errorType: 'resource',
    status: 'open',
  },
  {
    id: randomId(),
    message: 'Unhandled Promise Rejection: Network Error',
    stack: `Error: Network Error
    at XMLHttpRequest.handleError (axios/lib/adapters/xhr.js:117)`,
    url: '/monitor/performance',
    timestamp: daysAgo(2),
    count: 89,
    lastSeen: Date.now() - 1000 * 60 * 60 * 2,
    errorType: 'promise',
    status: 'resolved',
  },
  {
    id: randomId(),
    message: "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect",
    url: '/monitor/behavior',
    timestamp: daysAgo(3),
    count: 12,
    lastSeen: Date.now() - 1000 * 60 * 60 * 24,
    errorType: 'js',
    status: 'ignored',
  },
  {
    id: randomId(),
    message: 'img load failed: https://cdn.example.com/avatar/user_001.jpg',
    url: '/user/profile',
    timestamp: daysAgo(0),
    count: 234,
    lastSeen: Date.now() - 1000 * 60 * 2,
    errorType: 'resource',
    status: 'open',
  },
]

function generatePerformanceHistory(): PerformanceItem[] {
  const metrics: Array<PerformanceEvent['metric']> = ['LCP', 'FCP', 'CLS', 'TTFB', 'INP']
  const pages = ['/dashboard', '/user/list', '/monitor/errors', '/monitor/performance']
  const result: PerformanceItem[] = []

  for (let i = 0; i < 7; i++) {
    for (const metric of metrics) {
      for (const url of pages) {
        let value: number
        let rating: 'good' | 'needs-improvement' | 'poor'

        if (metric === 'LCP') {
          value = randomBetween(1200, 4500)
          rating = value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor'
        } else if (metric === 'FCP') {
          value = randomBetween(800, 3000)
          rating = value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor'
        } else if (metric === 'CLS') {
          value = randomBetween(0, 250) // 乘以 1000 后的值
          rating = value < 100 ? 'good' : value < 250 ? 'needs-improvement' : 'poor'
        } else if (metric === 'TTFB') {
          value = randomBetween(200, 1200)
          rating = value < 800 ? 'good' : value < 1800 ? 'needs-improvement' : 'poor'
        } else {
          value = randomBetween(100, 600)
          rating = value < 200 ? 'good' : value < 500 ? 'needs-improvement' : 'poor'
        }

        result.push({
          id: randomId(),
          metric,
          value,
          rating,
          url,
          timestamp: daysAgo(i),
        })
      }
    }
  }
  return result
}

const MOCK_PERFORMANCES = generatePerformanceHistory()

const MOCK_BEHAVIORS: BehaviorItem[] = [
  { id: randomId(), eventId: 'page_view', eventName: '页面访问', url: '/dashboard', timestamp: Date.now() - 1000, userId: 'user_001' },
  { id: randomId(), eventId: 'btn_login', eventName: '点击登录', url: '/login', timestamp: Date.now() - 5000, userId: 'user_002' },
  { id: randomId(), eventId: 'btn_export', eventName: '导出报表', url: '/monitor/errors', timestamp: Date.now() - 10000, userId: 'user_001', extra: { format: 'csv' } },
  { id: randomId(), eventId: 'filter_apply', eventName: '应用筛选', url: '/monitor/performance', timestamp: Date.now() - 15000, userId: 'user_003' },
  { id: randomId(), eventId: 'error_resolve', eventName: '标记已解决', url: '/monitor/errors', timestamp: Date.now() - 20000, userId: 'user_001', extra: { errorId: 'err_001' } },
]

const MOCK_STATS: DashboardStats = {
  totalErrors: 505,
  errorChange: -12.5,
  totalPV: 12847,
  pvChange: 8.3,
  avgLCP: 2340,
  lcpRating: 'good',
  totalEvents: 38921,
  activeUsers: 1247,
}

// ─── MSW Handlers ────────────────────────────────────────────────────────────

type PerformanceEvent = { metric: 'LCP' | 'FCP' | 'CLS' | 'TTFB' | 'INP' }

export const handlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    await delay(600)
    const body = await request.json() as { username: string; password: string }
    if (body.username === 'admin' && body.password === '123456') {
      return HttpResponse.json({
        code: 0,
        data: {
          id: 'user_001',
          name: '管理员',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          role: 'admin',
          token: 'mock_token_' + Date.now(),
        },
      })
    }
    return HttpResponse.json({ code: 401, message: '账号或密码错误' }, { status: 401 })
  }),

  // 登出
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return HttpResponse.json({ code: 0 })
  }),

  // Dashboard 统计
  http.get('/api/monitor/stats', async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, data: MOCK_STATS })
  }),

  // 错误列表
  http.get('/api/monitor/errors', async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const data = status ? MOCK_ERRORS.filter((e) => e.status === status) : MOCK_ERRORS
    return HttpResponse.json({ code: 0, data, total: data.length })
  }),

  // 标记错误已解决
  http.put('/api/monitor/errors/:id/resolve', async ({ params }) => {
    await delay(300)
    return HttpResponse.json({ code: 0, data: { id: params['id'], status: 'resolved' } })
  }),

  // 性能数据
  http.get('/api/monitor/performance', async ({ request }) => {
    await delay(600)
    const url = new URL(request.url)
    const metric = url.searchParams.get('metric')
    const data = metric
      ? MOCK_PERFORMANCES.filter((p) => p.metric === metric)
      : MOCK_PERFORMANCES
    return HttpResponse.json({ code: 0, data, total: data.length })
  }),

  // 行为埋点数据
  http.get('/api/monitor/behaviors', async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, data: MOCK_BEHAVIORS, total: MOCK_BEHAVIORS.length })
  }),

  // 接收上报数据（SDK Reporter 调用）
  http.post('/api/monitor/report', async () => {
    await delay(100)
    return HttpResponse.json({ code: 0 })
  }),
]
