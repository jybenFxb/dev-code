import type { MonitorEvent, MonitorConfig } from '@/types/monitor'

/**
 * 数据上报器
 * 核心设计：
 * 1. 队列批量上报，减少网络请求
 * 2. 优先 sendBeacon（页面关闭时也能发出），降级到 fetch
 * 3. 页面 visibilitychange/unload 时强制 flush
 */
export class Reporter {
  private queue: MonitorEvent[] = []
  private timer: ReturnType<typeof setInterval> | null = null
  private config: Required<Pick<MonitorConfig, 'reportUrl' | 'appId' | 'batchSize' | 'flushInterval' | 'sampleRate'>>

  constructor(config: MonitorConfig) {
    this.config = {
      reportUrl: config.reportUrl,
      appId: config.appId,
      batchSize: config.batchSize ?? 10,
      flushInterval: config.flushInterval ?? 5000,
      sampleRate: config.sampleRate ?? 1,
    }
  }

  init() {
    // 定时批量上报
    this.timer = setInterval(() => {
      this.flush()
    }, this.config.flushInterval)

    // 页面隐藏/关闭时立即上报（保障数据不丢失）
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush(true)
      }
    })

    window.addEventListener('beforeunload', () => {
      this.flush(true)
    })
  }

  /** 入队 */
  push(event: MonitorEvent) {
    // 采样过滤
    if (Math.random() > this.config.sampleRate) return

    this.queue.push(event)

    // 达到批量阈值，立即上报
    if (this.queue.length >= this.config.batchSize) {
      this.flush()
    }
  }

  /** 上报队列中的所有数据 */
  flush(useBeacon = false) {
    if (this.queue.length === 0) return

    const payload = {
      appId: this.config.appId,
      events: [...this.queue],
    }
    this.queue = []

    const body = JSON.stringify(payload)

    // sendBeacon：异步、不阻塞页面卸载、无法拿到响应
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(this.config.reportUrl, body)
      return
    }

    // 普通 fetch 上报
    fetch(this.config.reportUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true, // 页面卸载时依然能发送
    }).catch(() => {
      // 上报失败静默处理，不影响业务
    })
  }

  destroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.flush(true)
  }
}
