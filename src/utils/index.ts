import type { Menu } from '@/types/api'
import storage from './storage'
import type React from 'react'

export const TOKEN_KEY = 'ADMIN_TOKEN' // token 存储 key

export const setToken = (token: string) => storage.set(TOKEN_KEY, token)
export const getToken = () => storage.get(TOKEN_KEY)

/**
 *
 * @param path 依据path查找menu对象
 * @param routes
 * @returns
 */

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

export const sleep = <T>(time = 1000, result: T): Promise<T> =>
  new Promise(res => {
    setTimeout(() => {
      res(result)
    }, time)
  })

/**
 * 格式化金额
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
/**
 * 手机号加密
 * @param phone
 * @param emptyNode
 * @returns
 */
export const formatPhone = (phone: string | number, emptyNode: React.ReactNode = '-') => {
  if (!phone) return emptyNode
  return `${phone}`.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

/**
 * 递归查找树的路径(中文)
 * @param tree
 * @param pathName
 * @param path
 * @returns
 */
export const findTreeNode = <T = string>(
  tree: Menu.MenuItem[],
  path: string,
  result: T[] = [],
  key: keyof Menu.MenuItem = 'menuName'
): T[] => {
  if (!tree) return []
  for (const data of tree) {
    result.push(data?.[key] as T)
    if (data.path === path) return result
    if (data.children?.length) {
      const list = findTreeNode(data.children, path, result, key)
      if (list?.length) return list
    }
    result.pop()
  }
  return []
}
