import { HomeOutlined, TagOutlined } from '@ant-design/icons';
import React from 'react';

<<<<<<< HEAD
import {
  BannerList,
  EditTableList,
  ForgetPassword,
  HomeIndex,
  IndexPage,
  Login,
  Register,
} from './routerConfig';
=======
import { BannerList, EditTableList, HomeIndex, IndexPage, Login } from './routerConfig';
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d

function OptionRouters() {
  return [
    {
      id: 'login',
      path: '/login',
      label: '登录页',
      element: <Login />,
    },
    {
<<<<<<< HEAD
      id: 'login',
      path: '/register',
      label: '注册',
      element: <Register />,
    },
    {
      id: 'login',
      path: '/forgetpassword',
      label: '忘记密码',
      element: <ForgetPassword />,
    },
    {
      id: 'login',
      path: '/login',
      label: '登录页',
      element: <Login />,
    },
    {
=======
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
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
      ],
    },
  ];
}

export default OptionRouters();
