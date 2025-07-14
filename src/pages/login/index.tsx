import { LoginForm } from 'hnwx-antd-comps'
import styles from './index.module.css'
import type { Login, LoginParams } from '@/types/api'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import { message } from 'antd'
import api from '@/api'

export default () => {
  const updateToken = useStore(state => state.updateToken)
  const onFinish = async (values: any) => {
    try {
      const data = await api.login(values)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
      console.log('error: ', error)
    }
  }

  return (
    <div className={styles['login']}>
      <LoginForm
        title='xxx系统'
        logo='https://wisdomhammer.oss-cn-hangzhou.aliyuncs.com/pmsaas/1025/1/20250205/2da0e5c6ac87a13d04d11aabfd11b749.png?Expires=3316576048&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=prRMTQ%2BmXZBx8v3Hc6%2FHRAnD3Ho%3D'
        subTitle='xxx系统介绍说明'
        onSubmit={onFinish}
      />
    </div>
  )
}
