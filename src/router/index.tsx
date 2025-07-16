import { createHashRouter, Navigate } from 'react-router-dom'
import Error404 from '@/pages/404'
import Error403 from '@/pages/403'
import Login from '@/pages/login'
import Layout from '@/layout'
import AuthLoader from './AuthLoader'
import { lazyLoad } from './lazyLoad'
import React from 'react'
import ErrorBoundary from '@/components/error-boundary'

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
    id: 'layout',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    loader: AuthLoader,
    children: [
      {
        path: 'welcome',
        element: lazyLoad(React.lazy(() => import('@/pages/welcome')))
      },
      {
        path: 'dashboard',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard')))
      },
      {
        path: 'user',
        element: lazyLoad(React.lazy(() => import('@/pages/user')))
      },
      {
        path: 'user-detail/:id',
        element: lazyLoad(React.lazy(() => import('@/pages/user/user-detail')))
      },
      {
        path: 'auth-list',
        element: lazyLoad(React.lazy(() => import('@/pages/auth-list')))
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

export default createHashRouter(router)
