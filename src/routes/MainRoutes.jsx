import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Genres = Loadable(lazy(() => import('pages/genres/index')));
const Manga = Loadable(lazy(() => import('pages/manga/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'genres',
      element: <Genres />
    },
    {
      path: 'manga',
      element: <Manga />
    },
  ]
};

export default MainRoutes;
