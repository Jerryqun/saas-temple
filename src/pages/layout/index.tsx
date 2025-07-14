import React, { useEffect, useState } from 'react'
// import type { MenuProps } from 'antd'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/nav-header'
import NavFooter from '@/components/nav-footer'
import { Outlet } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'
import Menu from '@/components/menu'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo, updateCollapsed } = useStore()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  return (
    <Watermark content='react'>
      <Layout style={{ height: '100vh' }}>
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={updateCollapsed}>
          {/* <Menu defaultSelectedKeys={['1']} mode='inline' items={items} /> */}
          <Menu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <NavHeader />
          </Header>
          <Content>
            {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
            <Outlet />
          </Content>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
