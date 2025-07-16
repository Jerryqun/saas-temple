import { Component, type ErrorInfo, type ReactNode } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import style from './index.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.log('getDerivedStateFromError-error: ', error)
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true
    }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
  }
  render() {
    const { hasError, error, errorInfo } = this.state

    const { children } = this.props
    if (hasError) {
      return (
        <div className={style['boundary']}>
          <div className={style['error-boundary-info']}>
            <CloseCircleOutlined />
            <h3>抱歉，系统异常，请联系对应厂家</h3>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo?.componentStack}
            </details>
          </div>
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
