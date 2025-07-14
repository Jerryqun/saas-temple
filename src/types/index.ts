export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

interface Window {
  BMaoGL: {
    [key: string]: any
  }
}
