import { lazy } from 'react'

// project import
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')))
const Genres = Loadable(lazy(() => import('pages/genres/index')))
const Authors = Loadable(lazy(() => import('pages/authors/index')))
const Manga = Loadable(lazy(() => import('pages/manga/index')))
const Chapters = Loadable(lazy(() => import('pages/chapters/index')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '/genres',
      element: <Genres />,
    },
    {
      path: '/authors',
      element: <Authors />,
    },
    {
      path: '/manga',
      element: <Manga />,
    },
    {
      path: '/chapters',
      element: <Chapters />,
    },
  ],
}

export default MainRoutes
