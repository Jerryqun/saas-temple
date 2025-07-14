/**
 * 扩展axios中AxiosRequestConfig类型
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios'
// 声明模块 'axios' 的类型扩展
declare module 'axios' {
  // 扩展 AxiosRequestConfig 接口
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

declare interface Window {
  BMaoGL: {
    [key: string]: any
  }
}
