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
  test: 'cq',
  userInfo: {
    _id: '',
    userId: 0,
    userName: 'cq',
    userEmail: '932798303@qq.com',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg:
      'https://wisdomhammer.oss-cn-hangzhou.aliyuncs.com/pmsaas/1025/1/20230721/02be82d4e18bc3e7e155e1f744cf4586.jpeg?Expires=3267854213&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=MM2nS5lj6%2FEr7X%2FKkbeEP15bKsc%3D'
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
