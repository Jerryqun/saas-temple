import request from '@/utils/request'
import type { Dashboard, Dept, Login, Menu, ResultData, User } from '@/types/api'
import env from '@/config'
import { sleep } from '@/utils'
import { menuList } from '@/config'

export default {
  // 登录
  login(params: Login.params) {
    if (env.mock) {
      return sleep(1000, 'tets-token')
    }
    return request.post<string>('/users/login', params, { showLoading: false })
  },
  // 获取用户信息
  getUserInfo() {
    if (env.mock) {
      return sleep(1000, {
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
      })
    }
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获取权限列表
  getPermissionList() {
    if (env.mock) {
      return sleep(1000, menuList)
    }
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  // 获取城市分布数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  // 获取年龄分布数据
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取折线图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },
  // 获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  // 创建用户
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },
  // 部门管理
  // 部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  // 获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 修改部门
  eidtDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  // 创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  // 编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  // 删除菜单
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  }
}
