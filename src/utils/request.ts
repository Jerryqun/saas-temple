import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时请稍后',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    showLoading()
    if (import.meta.env.VITE_MOCK === 'true') {
      config.baseURL = import.meta.env.VITE_MOCK_API
    }
    return config
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  response => {
    hideLoading()
    return response
  },
  err => {
    console.log('err: ', err)
    hideLoading()
  }
)

export default {
  get<T>(url: string, params?: object, options?: object): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options?: object): Promise<T> {
    return instance.post(url, params, options)
  }
}
