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

export const sleep = <T>(time = 1000, result?: T): Promise<T> =>
  new Promise(res => {
    setTimeout(() => {
      res(result as T)
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

/**
 * 获取当前 URL 的参数对象（支持标准路由和 Hash 路由）
 * @param url 可选，默认为 window.location.href
 * @returns 参数键值对对象
 */
export function getRouteParams(url?: string): Record<string, string> {
  // 获取要解析的 URL
  const targetUrl = url || window.location.href

  // 处理 Hash 路由（如：#/path?param1=value1&param2=value2）
  const hashIndex = targetUrl.indexOf('#')
  const queryIndex = targetUrl.indexOf('?')

  let queryString = ''

  // 判断是否是 Hash 路由带参数
  if (hashIndex > -1 && queryIndex > hashIndex) {
    // 提取 Hash 后面的查询字符串
    queryString = targetUrl.substring(queryIndex + 1)
  }
  // 标准路由参数（如：/path?param1=value1&param2=value2）
  else if (queryIndex > -1) {
    queryString = targetUrl.substring(queryIndex + 1)
  }

  // 如果没有查询参数，返回空对象
  if (!queryString) {
    return {}
  }

  // 解析查询字符串
  const params = new URLSearchParams(queryString)
  const result: Record<string, string> = {}

  // 转换为普通对象
  params.forEach((value, key) => {
    result[key] = value
  })

  return result
}

export const getLocation = () => {
  const { pathname, search, hash } = window.location

  // 如果是 hash 路由，提取 hash 中的路径
  if (hash.startsWith('#/')) {
    const hashPath = hash.slice(1) // 去掉 `#`
    const [hashPathname, hashSearch] = hashPath.split('?')
    return {
      pathname: hashPathname || '/',
      search: hashSearch ? `?${hashSearch}` : '',
      hash: ''
    }
  }

  // 如果是 browser 路由，直接返回
  return {
    pathname,
    search,
    hash
  }
}
