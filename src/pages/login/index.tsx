import { LoginForm } from 'hnwx-antd-comps'
import styles from './index.module.css'
import type { LoginParams } from '@/types/api'
import loginApi from '@/api'
import { setToken } from '@/utils'

export default () => {
  const onSubmit = async (params: LoginParams) => {
    console.log('params: ', params)
    const data = await loginApi.login(params)
    console.log('data: ', data)
    setToken(data)
  }

  return (
    <div className={styles['login']}>
      <LoginForm
        title='xxx系统'
        logo='https://wisdomhammer.oss-cn-hangzhou.aliyuncs.com/pmsaas/1025/1/20250205/2da0e5c6ac87a13d04d11aabfd11b749.png?Expires=3316576048&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=prRMTQ%2BmXZBx8v3Hc6%2FHRAnD3Ho%3D'
        subTitle='xxx系统介绍说明'
        onSubmit={onSubmit}
      />
    </div>
  )
}
