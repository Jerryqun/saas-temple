import { LoginForm } from 'antd-ext-cq'
import styles from './index.module.css'
import { useStore } from '@/store'
import { message } from 'antd'
import api from '@/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setToken } from '@/utils'

export default function LoginPage() {
  const updateToken = useStore(state => state.updateToken)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleLogin = async (values: any) => {
    const callbackUrl = searchParams.get('callback')
    try {
      const data = await api.login(values)
      setToken(data)
      updateToken(data)
      message.success('登录成功')
      navigate(callbackUrl || '/welcome', { replace: true })
    } catch (error) {
      console.error('登录失败:', error)
    }
  }

  return (
    <div className={styles['login']}>
      <LoginForm
        title='xxx系统'
        logo='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        subTitle='xxx系统介绍说明'
        onSubmit={handleLogin}
      />
    </div>
  )
}
