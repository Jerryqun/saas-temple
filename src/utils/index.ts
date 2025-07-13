import type { Menu } from '@/types/api'
import storage from './storage'

export const TOKEN_KEY = 'ADMIN_TOKEN'

export const setToken = (token: string) => storage.set(TOKEN_KEY, token)

// 递归获取路由对象

export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) return result
    }
  }
  return ''
}

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

/**
 *
 * @param num
 * @returns
 */
export const formatMoney = (num?: number | string, options?: object) => {
  if (!num) return ''
  const n = parseFloat(num.toString())
  return n.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY', ...options })
}

/**
 * 格式化数字
 * @param num
 * @returns
 */
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 格式化时间
 * @param date
 * @param rule
 * @returns
 */

export const toLocalDate = (date?: Date, rule?: string) => {
  let cur = new Date()
  if (date) cur = date
  if (rule === 'yyyy-MM-dd') {
    return cur?.toLocaleDateString().replaceAll('/', '-')
  }
  if (rule === 'HH:mm:ss') {
    return cur.toLocaleTimeString().replaceAll('/', '-')
  }
  return cur.toLocaleString().replaceAll('/', '-')
}

/**
 * 时间格式化
 * @param date
 * @param rule
 * @returns
 */
export const formatDate = (date?: Date | string, rule?: string) => {
  let cur = new Date()
  if (date instanceof Date) {
    cur = date
  } else if (date) {
    cur = new Date(date)
    if (cur.toString() === 'Invalid Date') {
      return '请输入正确的时间格式'
    }
  }

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  const O: {
    [key: string]: number
  } = {
    yyyy: cur.getFullYear(),
    'M+': cur.getMonth() + 1,
    'd+': cur.getDate(),
    'H+': cur.getHours(),
    'm+': cur.getMinutes(),
    's+': cur.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), val)
  }
  return fmt
}
