import request from '@/utils/request'
import type { LoginParams } from '@/types/login'
export default {
  login(params: LoginParams) {
    return request.post<string>('/user/login', params, { showLoading: true })
  },
  getUserInfo() {}
}
