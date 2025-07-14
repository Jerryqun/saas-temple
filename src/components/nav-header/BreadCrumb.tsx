import type { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'
import { Breadcrumb } from 'antd'
import { useEffect, useState } from 'react'
import { useRouteLoaderData, useLocation } from 'react-router-dom'

export default () => {
  const [breadList, setBreadList] = useState<any>([])
  const { pathname } = useLocation()
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    const crumb = findTreeNode(data.menuList, pathname)
    crumb.unshift('首页')
    setBreadList(crumb)
  }, [pathname])

  return <Breadcrumb items={breadList.map((d: any) => ({ title: d }))} />
}
