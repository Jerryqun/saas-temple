import axios, { type AxiosError } from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import env from '@/config'
import type { Result } from '@/types'
import { message } from '@/utils/AntdGlobal'
import storage from './storage'
import { getToken, getLocation } from '@/utils'

const CodeMap = {
  TokenExpire: 500001,
  Success: 200
}

const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时请稍后',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()

    const token = getToken()
    if (token) {
      config.headers.token = token
    }

    config.baseURL = env.mock ? env.mockApi : env.baseApi
    return config
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response
    if (data.code === CodeMap.TokenExpire) {
      message.error(data.msg)
      storage.remove('token')
      window.location.href =
        `${location.href.includes('/#') ? '/#/login?callback=' : '/login?callback='}` +
        encodeURIComponent(getLocation().pathname)
    } else if (data.code != CodeMap.Success) {
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

type IConfig = {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(url: string, params?: object, options: IConfig = { showError: true, showLoading: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options: IConfig = { showError: true, showLoading: true }): Promise<T> {
    return instance.post(url, params, options)
  }
}
