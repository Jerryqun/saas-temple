// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export type LoginParams = any

export interface PageParams {
  pageNum: number
  pageSize?: number
}
export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}
// 用户管理
export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }

  export interface SearchParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    deptId: string
    job?: string
    state?: number
    roleList: string[]
    userImg: string
  }
  export interface EditParams extends CreateParams {
    userId: number
  }
}
// 部门管理
export namespace Dept {
  export interface Params {
    deptName?: string
  }
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface DelParams {
    _id: string
  }
  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}

export namespace Menu {
  export interface Params {
    menuName: string
    menuState: number
  }
  // 菜单创建
  export interface CreateParams {
    menuName: string // 菜单名称
    icon?: string // 菜单图标
    menuType: number // 1: 菜单 2：按钮 3：页面
    menuState: number // 1：正常 2：停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单ID
    path: string // 菜单路径
    component?: string // 组件名称
  }
  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
  export interface EditParams extends CreateParams {
    _id?: string
  }

  export interface DelParams {
    _id: string
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}

export namespace Role {
  export interface Params extends PageParams {
    roleName?: string
  }
  export interface CreateParams {
    roleName: string
    remark?: string
  }
  export interface RoleItem extends CreateParams {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
    updateTime: string
    createTime: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface Permission {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}
