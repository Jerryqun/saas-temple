import { create } from 'zustand'
import type { User } from '@/types/api'
import storage from '@/utils/storage'

type useStoreType = {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  isDark: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
  test: string
}

export const useStore = create<useStoreType>(set => ({
  token: '',
  test: '周乐乐',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '周乐乐',
    userEmail: '932798303@qq.com',
    deptId: '',
    state: 0,
    mobile: '13546767673',
    job: '开发工程师',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '财务部',
    userImg: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  },
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
}))
