import { useEffect } from 'react'
import request from '@/utils/request'

export default () => {
  console.log('import.meta.env', import.meta.env)
  useEffect(() => {
    request.get('/login', { name: 'cq' })
  }, [])

  return <div>login</div>
}
