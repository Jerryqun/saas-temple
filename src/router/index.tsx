import { Navigate, useRoutes } from 'react-router-dom'
import Error404 from '@/pages/404'
import Error403 from '@/pages/403'

export const router = [
  {
    path: '/',
    element: <div>welcome</div>
  },
  {
    path: '/login',
    element: <div>login</div>
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default function Router() {
  return useRoutes(router)
}

// export default createBrowserRouter(router)
