import type { Menu } from '@/types/api'
import { message } from 'antd'

message.config({ maxCount: 1 })

export const menuList: Menu.MenuItem[] = [
  {
    path: 'system',
    menuName: '系统管理',
    icon: 'icon-jianshen',
    createTime: '-',
    menuState: 1,
    menuType: 1,
    _id: '1',
    children: [
      {
        _id: '2',
        path: '/user',
        createTime: '-',
        parentId: '1',
        menuState: 1,
        menuType: 1,
        menuName: '用户列表',
        icon: 'icon-_minishichangguanli'
      },
      {
        _id: '3',
        path: '/auth-list',
        parentId: '1',
        createTime: '-',
        menuState: 1,
        menuType: 1,
        menuName: '权限列表',
        icon: 'icon-lirenmeirong'
      }
    ]
  },
  {
    path: 'order',
    menuName: '订单管理',
    createTime: '-',
    icon: 'icon-xitong',
    menuType: 1,
    menuState: 1,
    _id: '4',
    children: [
      {
        _id: '5',
        path: '/order-list',
        createTime: '-',
        menuState: 1,
        menuName: '订单列表',
        icon: 'icon-jinrong',
        parentId: '4',
        menuType: 1
      }
    ]
  }
]

/**
 * 环境配置封装(推荐运行时配置)
 */

type ENV = 'dev' | 'stg' | 'prd'

let env: ENV = 'dev'
console.log('env: ', env)
if (location.host.indexOf('localhost') > -1) {
  env = 'dev'
} else if (location.host === 'driver-stg.marsview.cc') {
  env = 'stg'
} else {
  env = 'prd'
}

// const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  }
}

export default {
  env,
  ...config[env]
}
