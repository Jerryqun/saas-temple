import { TableProvider } from 'hnwx-antd-comps'
import searchScheam from './search'
import tableScheam from './table'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default () => {
  const navigate = useNavigate()
  useEffect(() => {
    throw new Error('componentDidMount 出错！')
  }, [])
  return (
    <TableProvider cacheTableParams cacheTableParamsId='yhlb'>
      <TableProvider.Search {...searchScheam} />
      <TableProvider.Table {...tableScheam(navigate)} />
    </TableProvider>
  )
}
