import type { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'
import { Breadcrumb } from 'antd'
import type React from 'react'
import { useMemo } from 'react'
import { useRouteLoaderData, useLocation, useNavigate } from 'react-router-dom'

export default function BreadCrumbNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const data = useRouteLoaderData('layout') as IAuthLoader

  const breadItems = useMemo(() => {
    const crumbs = findTreeNode<React.ReactNode>(data.menuList, '/' + pathname.split('/')[1])
    const homeLink = (
      <a onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
        首页
      </a>
    )
    const items: React.ReactNode[] = [homeLink, ...crumbs]
    return items.map(item => ({ title: item }))
  }, [pathname, data.menuList, navigate])

  return <Breadcrumb items={breadItems} />
}
