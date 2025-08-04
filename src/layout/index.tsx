import React, { useEffect } from 'react'
// import type { MenuProps } from 'antd'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/nav-header'
import NavFooter from '@/components/nav-footer'
import { Outlet, useNavigate } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'
import Menu from '@/components/menu'
import TabsFC from '@/components/tabs'
import styles from './index.module.css'
import { getRouteParams, getToken } from '@/utils'
// import OutletKeepAlive from '@/components/keep-alive-outlet'

const { Header, Content, Sider } = Layout

const App: React.FC = () => {
  console.log('App component rendered', getRouteParams())
  const navigator = useNavigate()

  const { collapsed, updateUserInfo, updateCollapsed } = useStore()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  // if(gettoke)

  if (!getToken()) {
    navigator('/login', { replace: true })
  }

  return (
    <Watermark content='react'>
      <Layout style={{ height: '100vh' }} className={styles['layout-wrap']}>
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={updateCollapsed}>
          <Menu collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <NavHeader />
            <TabsFC />
          </Header>
          <Content className={styles['layout-content']}>
            {/* <OutletKeepAlive /> */}
            <Outlet></Outlet>
          </Content>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
