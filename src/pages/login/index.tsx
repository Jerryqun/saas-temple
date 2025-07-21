import { LoginForm } from 'hnwx-antd-comps'
import styles from './index.module.css'
// import type { Login, LoginParams } from '@/types/api'
import { useStore } from '@/store'
import { message } from 'antd'
import api from '@/api'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { setToken } from '@/utils'

export default () => {
  const updateToken = useStore(state => state.updateToken)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const onFinish = async (values: any) => {
    const callbackUrl = searchParams.get('callback')
    try {
      const data = await api.login(values)
      setToken(data)
      updateToken(data)
      message.success('登录成功')
      setTimeout(() => {
        navigate(callbackUrl || '/welcome', { replace: true })
      })
    } catch (error) {
      // setToken('test-token')
      // setTimeout(() => {
      //   navigate(callbackUrl || '/welcome', { replace: true })
      // })
      console.log('error: ', error)
    }
  }

  return (
    <div className={styles['login']}>
      <LoginForm
        title='xxx系统'
        logo='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        subTitle='xxx系统介绍说明'
        onSubmit={onFinish}
      />
    </div>
  )
}
