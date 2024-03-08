import { HomeOutlined, TagOutlined } from '@ant-design/icons';
import React from 'react';

import {
  BannerList,
  CssBoxScrollFlex,
  EditTableList,
  ForgetPassword,
  HomeIndex,
  IndexPage,
  Login,
  Register,
} from './routerConfig';

function OptionRouters() {
  return [
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
        {
          id: 'EditTablePage',
          path: '/editTablePage',
          label: '可编辑查询表格',
          element: <EditTableList />,
          icon: <TagOutlined />,
        },
        {
          id: 'CssBox',
          path: '/cssScrollFlex',
          label: 'CSS样式效果',
          element: <CssBoxScrollFlex />,
          icon: <TagOutlined />,
          children: [
            {
              id: 'CSSScrollFlex',
              path: '/cssScrollFlex',
              label: '滚动固定',
              element: <CssBoxScrollFlex />,
              icon: <TagOutlined />,
            },
          ],
        },
      ],
    },
    {
      id: 'login',
      path: '/login',
      label: '登录页',
      element: <Login />,
    },
    {
      id: 'register',
      path: '/register',
      label: '注册',
      element: <Register />,
    },
    {
      id: 'forgetpassword',
      path: '/forgetpassword',
      label: '忘记密码',
      element: <ForgetPassword />,
    },
  ];
}

export default OptionRouters();
