import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'
import type { Reporter } from './Reporter'
import type { PerformanceEvent } from '@/types/monitor'
import { generateSessionId } from '../utils'

/**
 * 性能监控
 * 使用 web-vitals 库采集 Core Web Vitals：
 * - LCP (Largest Contentful Paint): 最大内容绘制，衡量加载性能，<2.5s 为 good
 * - FCP (First Contentful Paint): 首次内容绘制
 * - CLS (Cumulative Layout Shift): 累积布局偏移，衡量视觉稳定性，<0.1 为 good
 * - TTFB (Time to First Byte): 首字节时间，衡量服务器响应速度
 * - INP (Interaction to Next Paint): 交互响应性，替代 FID
 */
export class PerformanceMonitor {
  private reporter: Reporter
  private sessionId: string

  constructor(reporter: Reporter) {
    this.reporter = reporter
    this.sessionId = generateSessionId()
  }

  init() {
    const report = (metric: Metric) => {
      const event: PerformanceEvent = {
        type: 'performance',
        timestamp: Date.now(),
        url: location.href,
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
        metric: metric.name as PerformanceEvent['metric'],
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: metric.rating,
      }
      this.reporter.push(event)
    }

    onLCP(report)
    onFCP(report)
    onCLS(report)
    onTTFB(report)
    onINP(report)
  }
}
