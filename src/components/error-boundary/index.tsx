import { Component } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import style from './index.module.css'

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }
  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError-error: ', error)
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true
    }
  }
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error, errorInfo })
  }
  render() {
    const { hasError, error, errorInfo } = this.state as any
    // eslint-disable-next-line react/prop-types
    const { children } = this.props as any
    if (hasError) {
      return (
        <div className={style.error_boundary}>
          <div className={style.error_boundary_info}>
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
