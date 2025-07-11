import request from '@/utils/request'
import type { LoginParams } from '@/types/login'
export default {
  login(params: LoginParams) {
    request.post('/user/login', params)
  },
  getUserInfo() {}
}
