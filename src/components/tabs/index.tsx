import type { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { Tabs } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.css'

interface TabItem {
  key: string
  label: string
  closable: boolean
}

const DEFAULT_TAB: TabItem = { key: '/welcome', label: '首页', closable: false }

export default function TabsFC() {
  const { pathname } = useLocation()
  const [tabsList, setTabsList] = useState<TabItem[]>([DEFAULT_TAB])
  const [activeKey, setActiveKey] = useState('')
  const data = (useRouteLoaderData('layout') as IAuthLoader) || { menuList: [] }
  const navigate = useNavigate()

  useEffect(() => {
    const pathSegments = pathname.split('/')

    // 如果当前路径已经在 tabsList 中（如 /welcome），直接激活即可
    const existingTab = tabsList.find(item => item.key === pathname)
    if (existingTab) {
      setActiveKey(pathname)
      return
    }

    // 详情页场景：路径超过两层时，复用同一父路径的 tab
    if (pathSegments.length > 2) {
      const parentPath = '/' + pathSegments[1]
      const route = searchRoute(parentPath, data.menuList)
      if (!route) return

      const parentTab = tabsList.find(item => item.key.includes(parentPath))
      if (!parentTab) {
        setTabsList(prev => [
          ...prev,
          { key: pathname, label: route.menuName, closable: true }
        ])
      } else {
        setTabsList(prev =>
          prev.map(tab => (tab.key.includes(parentPath) ? { ...tab, key: pathname } : tab))
        )
      }
      setActiveKey(pathname)
      return
    }

    const route = searchRoute(pathname, data.menuList)
    if (!route) return

    setTabsList(prev => [
      ...prev,
      { key: pathname, label: route.menuName, closable: pathname !== '/welcome' }
    ])
    setActiveKey(pathname)
  }, [pathname, data.menuList])

  const handleChange = useCallback(
    (path: string) => {
      navigate(path)
      setActiveKey(path)
    },
    [navigate]
  )

  const handleDelete = useCallback(
    (targetPath: string) => {
      if (pathname === targetPath) {
        const currentIndex = tabsList.findIndex(item => item.key === pathname)
        const nextTab = tabsList[currentIndex + 1] || tabsList[currentIndex - 1]
        if (nextTab) {
          navigate(nextTab.key)
        }
      }
      setTabsList(prev => prev.filter(item => item.key !== targetPath))
    },
    [pathname, tabsList, navigate]
  )

  return (
    <div className={styles['tabs']}>
      <Tabs
        activeKey={activeKey}
        items={tabsList}
        tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color)' }}
        type='editable-card'
        hideAdd
        onChange={handleChange}
        onEdit={path => handleDelete(path as string)}
      />
    </div>
  )
}
