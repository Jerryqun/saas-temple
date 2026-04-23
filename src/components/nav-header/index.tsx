import storage from '@/utils/storage'
import style from './index.module.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Dropdown, Switch, type MenuProps } from 'antd'
import { useCallback, useEffect, useMemo } from 'react'
import { useStore } from '@/store'
import BreadCrumbNav from './BreadCrumb'
import { useLocation, useNavigate } from 'react-router-dom'
import IconFont from '@/components/icon-comp'

export default function NavHeader() {
  const { userInfo, collapsed, isDark, updateCollapsed, updateTheme } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    applyTheme(isDark)
  }, [])

  const dropdownItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'email',
        label: (
          <div>
            <IconFont type='icon-youxiang' /> {'邮箱：' + userInfo.userEmail}
          </div>
        )
      },
      {
        key: 'logout',
        label: (
          <div>
            <IconFont type='icon-tuichudenglu' /> 退出
          </div>
        )
      }
    ],
    [userInfo.userEmail]
  )

  const handleDropdownClick: MenuProps['onClick'] = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        storage.remove('token')
        navigate('/login?callback=' + encodeURIComponent(location.pathname), { replace: true })
      }
    },
    [navigate, location.pathname]
  )

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  const handleThemeSwitch = useCallback(
    (dark: boolean) => {
      applyTheme(dark)
      storage.set('isDark', dark)
      updateTheme(dark)
    },
    [updateTheme]
  )

  return (
    <div className={style['nav-header']}>
      <div className={style['left']}>
        <div className={style['icon']} onClick={updateCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumbNav />
      </div>
      <div className={style['right']}>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleThemeSwitch}
        />
        <Dropdown className={style.nickName} menu={{ items: dropdownItems, onClick: handleDropdownClick }} trigger={['hover']}>
          <span>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}
