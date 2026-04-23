import { Menu as AntdMenu, type MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import type { IAuthLoader } from '@/router/AuthLoader'
import type { Menu } from '@/types/api'
import styles from './index.module.css'
import IconFont from '@/components/icon-comp'
import { findTreeNode } from '@/utils'

type MenuItem = Required<MenuProps>['items'][number]

function buildMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, icon, children, label } as MenuItem
}

function buildMenuTree(menuList: Menu.MenuItem[]): MenuItem[] {
  return menuList
    .filter(item => item.menuState !== 2)
    .map(item => {
      const icon = <IconFont type={item.icon || ''} />
      if (item.children && item.children.length > 0) {
        return buildMenuItem(item.menuName, item.path, icon, buildMenuTree(item.children))
      }
      return buildMenuItem(item.menuName, item.path, icon)
    })
}

interface SideMenuProps {
  collapsed: boolean
}

export default function SideMenu({ collapsed }: SideMenuProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const data = useRouteLoaderData('layout') as IAuthLoader

  const menuItems = useMemo(() => buildMenuTree(data.menuList), [data.menuList])

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    const parentPaths = findTreeNode(data.menuList, pathname, [], 'path')
    setOpenKeys(parentPaths)
  }, [pathname, data.menuList])

  const handleClickLogo = () => {
    navigate('/welcome')
  }

  if (!openKeys) return null

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
        items={menuItems}
      />
    </div>
  )
}
