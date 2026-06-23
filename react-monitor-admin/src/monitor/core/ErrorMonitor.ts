import type { Reporter } from './Reporter'
import type { ErrorEvent } from '@/types/monitor'
import { generateSessionId } from '../utils'

/**
 * 错误监控
 * 捕获三类错误：
 * 1. JS 运行时错误（window.onerror）
 * 2. Promise 未捕获异常（unhandledrejection）
 * 3. 资源加载失败（error 事件，区分于 JS 错误）
 */
export class ErrorMonitor {
  private reporter: Reporter
  private sessionId: string

  constructor(reporter: Reporter) {
    this.reporter = reporter
    this.sessionId = generateSessionId()
  }

  init() {
    this.listenJsError()
    this.listenPromiseError()
    this.listenResourceError()
  }

  private buildBase(): Omit<ErrorEvent, 'errorType' | 'message'> {
    return {
      type: 'error',
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
    }
  }

  /** 捕获 JS 运行时错误 */
  private listenJsError() {
    window.onerror = (message, filename, lineno, colno, error) => {
      this.reporter.push({
        ...this.buildBase(),
        errorType: 'js',
        message: String(message),
        filename,
        lineno,
        colno,
        stack: error?.stack,
      })
      return false // 不阻止默认处理
    }
  }

  /** 捕获 Promise 未处理的 rejection */
  private listenPromiseError() {
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason
      this.reporter.push({
        ...this.buildBase(),
        errorType: 'promise',
        message: reason instanceof Error ? reason.message : String(reason),
        stack: reason instanceof Error ? reason.stack : undefined,
      })
    })
  }

  /** 捕获资源加载失败（img/script/link） */
  private listenResourceError() {
    window.addEventListener(
      'error',
      (event) => {
        const target = event.target as HTMLElement
        // 区分资源错误与 JS 错误
        if (target && !(target instanceof Window) && 'src' in target) {
          this.reporter.push({
            ...this.buildBase(),
            errorType: 'resource',
            message: `资源加载失败: ${(target as HTMLImageElement | HTMLScriptElement).src}`,
            filename: (target as HTMLImageElement | HTMLScriptElement).src,
          })
        }
      },
      true // 捕获阶段，资源错误不冒泡
    )
  }

  /** 供 React ErrorBoundary 调用，上报组件树错误 */
  captureReactError(error: Error, componentStack: string) {
    this.reporter.push({
      ...this.buildBase(),
      errorType: 'js',
      message: error.message,
      stack: error.stack,
      componentStack,
    })
  }
}
