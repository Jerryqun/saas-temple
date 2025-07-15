import './styles/global.css'
import './styles/theme.css'
import { HashRouter, RouterProvider } from 'react-router'
import routers from './router'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import AntdGlobal from '@/utils/AntdGlobal'
import { useStore } from './store'

function App() {
  const isDark = useStore(state => state.isDark)
  console.log('isDark: ', isDark)

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#00b96b'
          // borderRadius: 2
          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntdApp message={{ maxCount: 1 }} className='antd-app'>
        <AntdGlobal />
        {/* <HashRouter> */}
        <RouterProvider router={routers} />
        {/* </HashRouter> */}
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
