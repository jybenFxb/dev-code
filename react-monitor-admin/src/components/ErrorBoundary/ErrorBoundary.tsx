import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Result, Button } from 'antd'
import { monitor } from '@/monitor'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * React 错误边界
 * 捕获子组件树中的 JS 错误，上报到监控 SDK，并展示降级 UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 上报到监控 SDK
    monitor.captureError(error, errorInfo.componentStack ?? '')
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{ padding: 40 }}>
          <Result
            status="error"
            title="页面渲染出错"
            subTitle={this.state.error?.message ?? '未知错误'}
            extra={
              <Button type="primary" onClick={this.handleReset}>
                重试
              </Button>
            }
          />
        </div>
      )
    }

    return this.props.children
  }
}
