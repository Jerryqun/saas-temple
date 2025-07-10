/**
 * 格式化金额
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
