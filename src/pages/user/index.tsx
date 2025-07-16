import { TableProvider } from 'hnwx-antd-comps'
import searchScheam from './search'
import tableScheam from './table'
import { useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  return (
    <TableProvider cacheTableParams cacheTableParamsId='yhlb'>
      <TableProvider.Search {...searchScheam} />
      <TableProvider.Table {...tableScheam(navigate)} />
    </TableProvider>
  )
}
