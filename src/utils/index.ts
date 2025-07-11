/**
 *
 * @param num
 * @returns
 */
export const formatMoney = (num: number | string, options: object) => {
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
