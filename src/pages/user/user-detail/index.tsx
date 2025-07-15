import { useParams } from 'react-router-dom'
export default () => {
  const params = useParams()
  console.log('user-id: ', params.id)
  return <div>user-detail</div>
}
