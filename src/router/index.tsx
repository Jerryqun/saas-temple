import { createBrowserRouter, Navigate } from 'react-router-dom'
import Error404 from '@/pages/404'
import Error403 from '@/pages/403'
import WelCome from '@/pages/welcome'
import Login from '@/pages/login'
import Layout from '@/pages/layout'
import Dashboard from '@/pages/dashboard'
import UserList from '@/pages/user-list'

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: 'welcome',
        element: <WelCome />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'user',
        element: <UserList />
      }
    ]
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

// export default function Router() {
//   return useRoutes(router)
// }

export default createBrowserRouter(router)
