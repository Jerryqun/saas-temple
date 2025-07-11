import './global.css'
import { HashRouter } from 'react-router'
import Router from './router'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#00b96b',
          borderRadius: 2,

          // 派生变量，影响范围小
          colorBgContainer: '#f6ffed'
        }
      }}
    >
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
