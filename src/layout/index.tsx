import React, { useEffect } from 'react'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/nav-header'
import NavFooter from '@/components/nav-footer'
import { Outlet, useNavigate } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'
import Menu from '@/components/menu'
import TabsFC from '@/components/tabs'
import styles from './index.module.css'
import { getToken } from '@/utils'

const { Header, Content, Sider } = Layout

const AppLayout: React.FC = () => {
  const navigate = useNavigate()
  const { collapsed, updateUserInfo, updateCollapsed } = useStore()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true })
      return
    }
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
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
            <Outlet />
          </Content>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default AppLayout
