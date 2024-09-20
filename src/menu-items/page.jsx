import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'

const icons = {
  AppstoreOutlined,
  UnorderedListOutlined,
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
