import type { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.css'
interface TabsItem {
  key: string
  label: string
  closable: boolean
}
export default function TabsFC() {
  const { pathname } = useLocation()
  const [tabsList, setTabsList] = useState<TabsItem[]>([{ key: '/welcome', label: '首页', closable: false }])
  const [activeKey, setActiveKey] = useState('')
  const data = (useRouteLoaderData('layout') as IAuthLoader) || { menuList: [] }
  const navigate = useNavigate()
  useEffect(() => {
    addTabs()
  }, [pathname])

  // 创建页签
  const addTabs = () => {
    const pathSplit = pathname.split('/')
    // 判断是不是详情页,当时详情页的时候 tabs永远只有一个
    if (pathSplit.length > 2) {
      const p = '/' + pathname.split('/')?.[1]
      const route = searchRoute(p, data.menuList)
      if (!route) return

      const cur = tabsList.find(item => item.key.includes(p))
      if (!cur) {
        tabsList.push({
          key: pathname,
          label: route.menuName,
          closable: pathname !== '/welcome'
        })
        setTabsList([...tabsList]) // 新的值才能触发render
        setActiveKey(pathname)
      } else {
        setTabsList(
          tabsList.map(d => {
            if (d.key.includes(p)) {
              return { ...d, key: pathname }
            } else {
              return { ...d }
            }
          })
        ) // 新的值才能触发render
        setActiveKey(pathname)
      }
      return
    }

    const route = searchRoute(pathname, data.menuList)
    if (!route) return
    if (!tabsList.find(item => item.key == pathname)) {
      tabsList.push({
        key: pathname,
        label: route.menuName,
        closable: pathname !== '/welcome'
      })
    }
    setTabsList([...tabsList]) // 新的值才能触发render
    setActiveKey(pathname)
  }

  // 路由切换
  const handleChange = (path: string) => {
    navigate(path)
    setActiveKey(path)
  }

  const handleDel = (path: string) => {
    if (pathname === path) {
      tabsList.forEach((item, index: number) => {
        if (item.key != pathname) return
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (!nextTab) return
        navigate(nextTab.key)
      })
    }
    setTabsList(tabsList.filter(item => item.key != path))
  }

  return (
    <div className={styles['tabs']}>
      <Tabs
        activeKey={activeKey}
        items={tabsList}
        tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color)' }}
        type='editable-card'
        hideAdd
        onChange={handleChange}
        onEdit={path => {
          handleDel(path as string)
        }}
      />
    </div>
  )
}
