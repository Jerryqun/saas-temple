import { useEffect } from 'react'
import request from '@/utils/request'
import { formatDate } from '@/utils'

export default () => {
  console.log('import.meta.env', import.meta.env)
  console.log('time---', formatDate('2024-7-1321 11:4:19'))
  useEffect(() => {
    request.get('/login', { name: 'cq' })
  }, [])

  return <div>login</div>
}
