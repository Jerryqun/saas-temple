// import api from '@/api'
import type { Menu } from '@/types/api'
// import { getMenuPath } from '@/utils'
// import { menuList } from '@/config'
import api from '@/api'

/**
 * 如果你在 React Router 的 loader 函数里使用了 useContext，这是不允许的，因为 loader 是服务端逻辑，不能访问 React Hooks
 */

export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}
export default async function AuthLoader() {
  // const navigator = useNavigate()

  const data = await api.getPermissionList()
  // console.log('data: ', data)
  // const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: [],
    menuList: data,
    menuPathList: []
  }
}
