import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
export default () => {
  const navigator = useNavigate()
  return (
    <Result
      status={403}
      title='403'
      subTitle='抱歉，访问的页面你没有权限'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigator('/')
          }}
        >
          回首页
        </Button>
      }
    />
  )
}
