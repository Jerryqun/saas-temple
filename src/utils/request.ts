import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import env from '@/config'
import type { Result } from '@/types'
import { message } from '@/utils/AntdGlobal'
import storage from './storage'
import { getToken, getLocation } from '@/utils'

const CodeMap = {
  // token过期
  TokenExpire: 500001,
  // success
  Success: 200
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 已被运行时覆盖
  timeout: 8000,
  timeoutErrorMessage: '请求超时请稍后',
  withCredentials: true, // 允许携带cookie
  headers: {
    token: getToken()
  }
})

instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    // if (import.meta.env.VITE_MOCK === 'true') {
    //   config.baseURL = import.meta.env.VITE_MOCK_API
    // }

    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return config
  },
  (error: AxiosError) => {
    console.log('error-instance.interceptors.request: ', error)
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
    console.log('error-instance.interceptors.response: ', error)
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
