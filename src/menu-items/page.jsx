import { AppstoreOutlined, UnorderedListOutlined, TeamOutlined } from '@ant-design/icons'

const icons = {
  AppstoreOutlined,
  UnorderedListOutlined,
  TeamOutlined,
}

const pages = {
  id: 'page',
  title: 'Page',
  type: 'group',
  children: [
    {
      id: 'genres',
      title: 'Genres',
      type: 'item',
      url: '/genres',
      icon: icons.AppstoreOutlined,
      breadcrumbs: true,
    },
    {
      id: 'authors',
      title: 'Authors',
      type: 'item',
      url: '/authors',
      icon: icons.TeamOutlined,
      breadcrumbs: true,
    },
    {
      id: 'list',
      title: 'List',
      type: 'item',
      url: '/manga',
      icon: icons.UnorderedListOutlined,
      breadcrumbs: true,
    },
  ],
}

export default pages
