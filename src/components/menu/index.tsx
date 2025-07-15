import { Menu as AntdMenu, type MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import type { IAuthLoader } from '@/router/AuthLoader'
import type { Menu } from '@/types/api'
import styles from './index.module.css'
import IconFont from '@/components/icon'
import { findTreeNode } from '@/utils'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

function getMenuData(menuList: Menu.MenuItem[]) {
  const items: any = menuList.map(d => {
    // 过滤禁用的菜单
    if (d.menuState === 2) {
      return null
    }
    if (d.children && d.children.length > 0) {
      return getItem(d.menuName, d.path, <IconFont type={d.icon || ''} />, getMenuData(d.children))
    } else {
      return getItem(d.menuName, d.path, <IconFont type={d.icon || ''} />)
    }
  })

  return items
}

export default ({ collapsed }: any) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const data = useRouteLoaderData('layout') as IAuthLoader

  const items = getMenuData(data.menuList)

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    setSelectedKeys([pathname])
    const parentPaths = findTreeNode(data.menuList, pathname, [], 'path')
    setOpenKeys(parentPaths)
  }, [])

  // Logo点击
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  if (!openKeys) return

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' className={styles.img} />
        {collapsed ? '' : <span>saas系统模板</span>}
      </div>
      <AntdMenu
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        defaultOpenKeys={openKeys}
        mode='inline'
        items={items}
      />
    </div>
  )
}
