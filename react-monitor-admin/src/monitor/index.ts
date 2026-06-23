import { Reporter } from './core/Reporter'
import { ErrorMonitor } from './core/ErrorMonitor'
import { PerformanceMonitor } from './core/PerformanceMonitor'
import { BehaviorTracker } from './core/BehaviorTracker'
import type { MonitorConfig } from '@/types/monitor'

/**
 * 监控 SDK 入口
 *
 * 用法：
 * ```ts
 * import { monitor } from '@/monitor'
 *
 * monitor.init({
 *   reportUrl: '/api/monitor/report',
 *   appId: 'react-monitor-admin',
 * })
 *
 * // 命令式埋点
 * monitor.track('btn_login', '点击登录按钮')
 *
 * // 设置用户 ID（登录后调用）
 * monitor.setUserId('user_123')
 * ```
 */
class Monitor {
  private reporter!: Reporter
  private errorMonitor!: ErrorMonitor
  private performanceMonitor!: PerformanceMonitor
  private behaviorTracker!: BehaviorTracker
  private initialized = false

  init(config: MonitorConfig) {
    if (this.initialized) return
    this.initialized = true

    this.reporter = new Reporter(config)
    this.reporter.init()

    this.errorMonitor = new ErrorMonitor(this.reporter)
    this.performanceMonitor = new PerformanceMonitor(this.reporter)
    this.behaviorTracker = new BehaviorTracker(this.reporter)

    if (config.enableError !== false) {
      this.errorMonitor.init()
    }
    if (config.enablePerformance !== false) {
      this.performanceMonitor.init()
    }
    if (config.enableBehavior !== false) {
      this.behaviorTracker.init()
    }

    console.log('[Monitor] SDK 初始化完成', { appId: config.appId })
  }

  setUserId(userId: string) {
    this.behaviorTracker?.setUserId(userId)
  }

  track(eventId: string, eventName: string, extra?: Record<string, unknown>) {
    this.behaviorTracker?.track(eventId, eventName, extra)
  }

  captureError(error: Error, componentStack = '') {
    this.errorMonitor?.captureReactError(error, componentStack)
  }

  flush() {
    this.reporter?.flush()
  }
}

// 单例导出
export const monitor = new Monitor()
export { ErrorMonitor, PerformanceMonitor, BehaviorTracker, Reporter }
export type { MonitorConfig }
