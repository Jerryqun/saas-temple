// import React from 'react'
// import { Menu } from 'antd'
// import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
// import styles from './index.module.css'
// import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
// import { useStore } from '@/store'
// import type { MenuProps, MenuTheme } from 'antd/es/menu'
// import { useEffect, useState } from 'react'
// import type { Menu as IMenu } from '@/types/api'
// import * as Icons from '@ant-design/icons'
// const SideMenu = () => {
//   const [menuList, setMenuList] = useState<MenuItem[]>([])
//   const navigate = useNavigate()
//   const { collapsed, isDark } = useStore(state => ({ collapsed: state.collapsed, isDark: state.isDark }))
//   const data: any = useRouteLoaderData('layout') || { menuList: [] }
//   const [selectedKeys, setSelectedKeys] = useState<string[]>([])

import { Menu, type MenuProps } from 'antd'

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('首页', 'welcome', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />)
]

//   const { pathname } = useLocation()
//   type MenuItem = Required<MenuProps>['items'][number]
//   // 生成每一个菜单项
//   function getItem(
//     label: React.ReactNode,
//     key?: React.Key | null,
//     icon?: React.ReactNode,
//     children?: MenuItem[]
//   ): MenuItem {
//     return {
//       label,
//       key,
//       icon,
//       children
//     } as MenuItem
//   }
//   function createIcon(name?: string) {
//     if (!name) return <></>
//     const customerIcons: { [key: string]: any } = Icons
//     const icon = customerIcons[name]
//     if (!icon) return <></>
//     return React.createElement(icon)
//   }
//   // 递归生成菜单
//   const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
//     menuList.forEach((item, index) => {
//       if (item.menuType === 1 && item.menuState === 1) {
//         if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
//         treeList.push(
//           getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
//         )
//       }
//     })
//     return treeList
//   }
//   // 初始化，获取接口菜单列表数据
//   useEffect(() => {
//     const treeMenuList = getTreeMenu(data.menuList || [])
//     setMenuList(treeMenuList)
//     setSelectedKeys([pathname])
//   }, [])

//   // Logo点击
//   const handleClickLogo = () => {
//     navigate('/welcome')
//   }

//   // 菜单点击
//   const handleClickMenu = ({ key }: { key: string }) => {
//     setSelectedKeys([key])
//     navigate(key)
//   }
//   return (
//     <div className={styles.navSide}>
//       <div className={styles.logo} onClick={handleClickLogo}>
//         <img src='/imgs/logo.png' className={styles.img} />
//         {collapsed ? '' : <span>慕慕货运</span>}
//       </div>
//       <Menu
//         mode='inline'
//         theme={isDark ? 'light' : 'dark'}
//         style={{
//           width: collapsed ? 80 : 'auto',
//           height: 'calc(100vh - 50px)'
//         }}
//         selectedKeys={selectedKeys}
//         onClick={handleClickMenu}
//         items={menuList}
//       />
//     </div>
//   )
// }

// export default SideMenu

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    setSelectedKeys([pathname])
  }, [])

  return (
    <Menu
      selectedKeys={selectedKeys}
      onClick={handleClickMenu}
      defaultSelectedKeys={['1']}
      mode='inline'
      items={items}
    />
  )
}
