import type { Reporter } from './Reporter'
import type { BehaviorEvent, PVEvent } from '@/types/monitor'
import { generateSessionId } from '../utils'

/**
 * 行为埋点追踪器
 * 设计亮点：
 * 1. 声明式埋点：HTML 元素加 data-track-id 属性即可，零侵入业务代码
 * 2. 事件委托：一个监听器覆盖所有埋点，性能优于逐元素绑定
 * 3. PV 追踪：劫持 history.pushState/replaceState 实现 SPA 路由监听
 */
export class BehaviorTracker {
  private reporter: Reporter
  private sessionId: string
  private userId?: string

  constructor(reporter: Reporter) {
    this.reporter = reporter
    this.sessionId = generateSessionId()
  }

  init() {
    this.listenClick()
    this.listenPageView()
    this.trackInitialPV()
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  private buildBase(): Omit<BehaviorEvent, 'eventId' | 'eventName'> {
    return {
      type: 'behavior',
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
      userId: this.userId,
    }
  }

  /** 声明式点击埋点：监听 data-track-id 属性 */
  private listenClick() {
    document.addEventListener(
      'click',
      (e: MouseEvent) => {
        const target = e.target as Element
        // 向上查找最近的带有 data-track-id 的元素
        const trackEl = target.closest('[data-track-id]')
        if (!trackEl) return

        const eventId = trackEl.getAttribute('data-track-id') ?? ''
        const eventName = trackEl.getAttribute('data-track-name') ?? eventId

        // 解析 extra 参数
        let extra: Record<string, unknown> | undefined
        const extraStr = trackEl.getAttribute('data-track-extra')
        if (extraStr) {
          try {
            extra = JSON.parse(extraStr) as Record<string, unknown>
          } catch {
            // 忽略解析错误
          }
        }

        this.reporter.push({
          ...this.buildBase(),
          eventId,
          eventName,
          elementTag: trackEl.tagName.toLowerCase(),
          elementText: (trackEl as HTMLElement).innerText?.slice(0, 50),
          extra,
        })
      },
      false
    )
  }

  /** 劫持 history API 实现 SPA 路由 PV 追踪 */
  private listenPageView() {
    const originalPushState = history.pushState.bind(history)
    const originalReplaceState = history.replaceState.bind(history)

    history.pushState = (...args) => {
      originalPushState(...args)
      this.trackPV()
    }

    history.replaceState = (...args) => {
      originalReplaceState(...args)
      this.trackPV()
    }

    window.addEventListener('popstate', () => {
      this.trackPV()
    })
  }

  private trackInitialPV() {
    this.trackPV()
  }

  private trackPV() {
    const event: PVEvent = {
      type: 'pv',
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
      userId: this.userId,
      referrer: document.referrer,
      title: document.title,
    }
    this.reporter.push(event)
  }

  /** 命令式埋点 API，供业务代码直接调用 */
  track(eventId: string, eventName: string, extra?: Record<string, unknown>) {
    this.reporter.push({
      ...this.buildBase(),
      eventId,
      eventName,
      extra,
    })
  }
}
