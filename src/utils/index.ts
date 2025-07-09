const a = 1

function FN<T>(params: T): T {
  return params
}

type User = {
  name: 'cq'
  age: 18
}

type UserKey = keyof User

const name1: UserKey = 'name'

const user = {
  a: 1,
  b: 2
}

type AAA = typeof user
