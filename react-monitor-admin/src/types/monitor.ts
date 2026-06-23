// 监控 SDK 公共类型定义

export type EventType = 'error' | 'performance' | 'behavior' | 'pv'

export interface BaseEvent {
  type: EventType
  timestamp: number
  url: string
  userAgent: string
  sessionId: string
  userId?: string
}

export interface ErrorEvent extends BaseEvent {
  type: 'error'
  errorType: 'js' | 'promise' | 'resource' | 'http'
  message: string
  stack?: string
  filename?: string
  lineno?: number
  colno?: number
  componentStack?: string // React ErrorBoundary
}

export interface PerformanceEvent extends BaseEvent {
  type: 'performance'
  metric: 'LCP' | 'FCP' | 'CLS' | 'TTFB' | 'INP' | 'FID'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export interface BehaviorEvent extends BaseEvent {
  type: 'behavior'
  eventId: string
  eventName: string
  elementTag?: string
  elementText?: string
  extra?: Record<string, unknown>
}

export interface PVEvent extends BaseEvent {
  type: 'pv'
  referrer: string
  title: string
}

export type MonitorEvent = ErrorEvent | PerformanceEvent | BehaviorEvent | PVEvent

export interface MonitorConfig {
  /** 上报接口地址 */
  reportUrl: string
  /** 应用 ID */
  appId: string
  /** 批量上报阈值（条数） */
  batchSize?: number
  /** 批量上报间隔（ms） */
  flushInterval?: number
  /** 采样率 0-1 */
  sampleRate?: number
  /** 是否开启性能监控 */
  enablePerformance?: boolean
  /** 是否开启行为埋点 */
  enableBehavior?: boolean
  /** 是否开启错误监控 */
  enableError?: boolean
}
