import { useEffect } from 'react'
import request from '@/utils/request'

export default () => {
  useEffect(() => {
    request.get('/login', { name: 'cq' })
  }, [])

  return <div>login</div>
}
