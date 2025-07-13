const getDataList = (l = 18) => {
  const result = []
  for (let i = 1; i <= l; i++) {
    if (i === 1) {
      result.push({
        classify: `职业${i}`,
        score: 79,
        city: `湖南长沙${i}`,
        sex: `性别${i}`,
        sign: `签名${i}`,
        index: i,
        id: i,
        logins: 99,
        username: `用户姓名`
      })
    } else {
      result.push({
        classify: `职业${i}`,
        score: 79,
        city: `湖南长沙${i}`,
        sex: `性别${i}`,
        sign: `签名${i}`,
        index: i,
        id: i,
        logins: 99,
        username: `用户姓名${i}`
      })
    }
  }
  return result
}

interface User {
  classify: string
  score: number
  city: string
  sex: string
  sign: string
  index: number
  id: number
  logins: number
  username: string
}

class UserService {
  private users: User[]
  private currentId: number = 1
  constructor(length: number = 18) {
    this.users = getDataList(length)
  }

  // 创建用户
  createUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.currentId++ }
    this.users.push(newUser)
    return newUser
  }

  // 删除用户
  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id)
    if (index !== -1) {
      this.users.splice(index, 1)
      return true
    }
    return false
  }

  // 更新用户
  updateUser(id: number, updatedUser: Partial<Omit<User, 'id'>>): User | null {
    const user = this.users.find(user => user.id === id)
    if (user) {
      Object.assign(user, updatedUser)
      return user
    }
    return null
  }

  // 获取用户 (可以分页)
  getUsers(
    { pageNum, pageSize = 10 }: { pageNum: number; pageSize: number },
    page = true
  ): {
    data: User[]
    total: number
    code: number
  } {
    const startIndex = (pageNum - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedUsers = this.users.slice(startIndex, endIndex)
    const total = this.users.length
    return { data: page ? paginatedUsers : this.users, total, code: 200 }
  }
}

export default UserService
