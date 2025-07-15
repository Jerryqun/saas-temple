import storage from '@/utils/storage'
import style from './index.module.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Dropdown, Switch, type MenuProps } from 'antd'
import { useEffect } from 'react'
import { useStore } from '@/store'
import BreadCrumb from './BreadCrumb'
import { useLocation, useNavigate } from 'react-router-dom'

export default () => {
  const { userInfo, collapsed, isDark, updateCollapsed, updateTheme } = useStore()

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    handleSwitch(isDark)
  }, [])
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed()
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      navigate('/login?callback=' + encodeURIComponent(location.pathname))
    }
  }

  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    storage.set('isDark', isDark)
    updateTheme(isDark)
  }
  return (
    <div className={style['nav-header']}>
      <div className={style['left']}>
        <div className={style['icon']} onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumb />
      </div>
      <div className={style['right']}>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={style.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}
