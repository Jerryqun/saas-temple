// import api from '@/api'
import type { Menu } from '@/types/api'
// import { getMenuPath } from '@/utils'
import { menuList } from '@/config'
export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}
export default async function AuthLoader() {
  // const data = await api.getPermissionList()
  // const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: [],
    menuList: menuList,
    menuPathList: []
  }
}
