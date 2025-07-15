import type { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'
import { Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouteLoaderData, useLocation } from 'react-router-dom'

export default () => {
  const [breadList, setBreadList] = useState<any>([])
  const { pathname } = useLocation()
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    const crumb = findTreeNode<React.ReactNode>(data.menuList, pathname)
    crumb.unshift(<a href='/welcome'>首页</a>)
    setBreadList(crumb)
  }, [pathname])

  return <Breadcrumb items={breadList.map((d: any) => ({ title: d }))} />
}
