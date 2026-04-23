import { create } from 'zustand'
import type { User } from '@/types/api'
import storage from '@/utils/storage'

interface StoreState {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  isDark: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}

const DEFAULT_USER_INFO: User.UserItem = {
  _id: '',
  userId: 0,
  userName: '',
  userEmail: '',
  deptId: '',
  state: 0,
  mobile: '',
  job: '',
  role: 0,
  roleList: '',
  createId: 0,
  deptName: '',
  userImg: ''
}

export const useStore = create<StoreState>(set => ({
  token: '',
  userInfo: DEFAULT_USER_INFO,
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))
