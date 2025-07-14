import { TableProvider } from 'hnwx-antd-comps'

import React from 'react'
import searchScheam from './search'
import tableScheam from './table'

export default () => {
  return (
    <div className='common-layout'>
      <TableProvider cacheTableParams cacheTableParamsId='yhlb'>
        <TableProvider.Search {...searchScheam} />
        <TableProvider.Table {...tableScheam} />
      </TableProvider>
    </div>
  )
}
