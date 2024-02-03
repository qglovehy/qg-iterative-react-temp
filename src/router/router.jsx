import { HomeOutlined, TagOutlined } from '@ant-design/icons';
import React from 'react';

import { BannerList, HomeIndex, IndexPage, Login } from './routerConfig';

function OptionRouters() {
  return [
    {
      id: 'login',
      path: '/login',
      label: '登录页',
      element: <Login />,
    },
    {
      id: 'app',
      path: '/',
      label: '入口',
      element: <HomeIndex />,
      children: [
        {
          id: 'Index',
          path: '/index',
          label: '首页',
          element: <IndexPage />,
          icon: <HomeOutlined />,
        },
        {
          id: 'BannerList',
          path: '/bannerList',
          label: '基础查询表格',
          element: <BannerList />,
          icon: <TagOutlined />,
        },
      ],
    },
  ];
}

export default OptionRouters();
