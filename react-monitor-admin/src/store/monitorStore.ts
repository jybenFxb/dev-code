import { create } from 'zustand'

export interface ErrorItem {
  id: string
  message: string
  stack?: string
  url: string
  timestamp: number
  count: number
  lastSeen: number
  errorType: 'js' | 'promise' | 'resource' | 'http'
  status: 'open' | 'resolved' | 'ignored'
}

export interface PerformanceItem {
  id: string
  metric: 'LCP' | 'FCP' | 'CLS' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  url: string
  timestamp: number
}

export interface BehaviorItem {
  id: string
  eventId: string
  eventName: string
  url: string
  timestamp: number
  userId?: string
  extra?: Record<string, unknown>
}

export interface DashboardStats {
  totalErrors: number
  errorChange: number // 相比昨天的变化百分比
  totalPV: number
  pvChange: number
  avgLCP: number
  lcpRating: 'good' | 'needs-improvement' | 'poor'
  totalEvents: number
  activeUsers: number
}

interface MonitorStore {
  errors: ErrorItem[]
  performances: PerformanceItem[]
  behaviors: BehaviorItem[]
  stats: DashboardStats | null
  setErrors: (errors: ErrorItem[]) => void
  setPerformances: (items: PerformanceItem[]) => void
  setBehaviors: (items: BehaviorItem[]) => void
  setStats: (stats: DashboardStats) => void
  resolveError: (id: string) => void
}

export const useMonitorStore = create<MonitorStore>((set) => ({
  errors: [],
  performances: [],
  behaviors: [],
  stats: null,
  setErrors: (errors) => set({ errors }),
  setPerformances: (performances) => set({ performances }),
  setBehaviors: (behaviors) => set({ behaviors }),
  setStats: (stats) => set({ stats }),
  resolveError: (id) =>
    set((state) => ({
      errors: state.errors.map((e) => (e.id === id ? { ...e, status: 'resolved' as const } : e)),
    })),
}))
