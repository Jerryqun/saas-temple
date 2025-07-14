import { TableProvider } from 'hnwx-antd-comps'

import React from 'react'
import searchScheam from './search'
import tableScheam from './table'

export default () => {
  return (
    <TableProvider cacheTableParams cacheTableParamsId='yhlb'>
      <TableProvider.Search {...searchScheam} />
      <TableProvider.Table {...tableScheam} />
    </TableProvider>
  )
}
