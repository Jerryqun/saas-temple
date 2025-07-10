import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时请稍后',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    showLoading()
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(response => {
  hideLoading()
  return response
})

export default {
  get<T>(url: string, params?: object, options?: object): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options?: object): Promise<T> {
    return instance.post(url, params, options)
  }
}
