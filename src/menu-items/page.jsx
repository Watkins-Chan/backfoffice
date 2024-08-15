// assets
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

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
      breadcrumbs: true
    },
    {
      id: 'list',
      title: 'Manga',
      type: 'item',
      url: '/manga',
      icon: icons.UnorderedListOutlined,
      breadcrumbs: true
    }
  ]
};

export default pages;
