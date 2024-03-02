import { lazy } from 'react';

import Home from '@/pages/Home';
import LoginIndex from '@/pages/Login';

/*
 * 首页
 */
export const HomeIndex = Home;

/*
 * 登录页
 */
export const Login = LoginIndex;

/*
 * 首页
 */
export const IndexPage = lazy(() =>
  import(/* webpackChunkName: "IndexPage" */ '@/pages/Home/IndexPage/index'),
);

/*
 * 注册
 */
export const Register = lazy(() =>
  import(/* webpackChunkName: "Register" */ '@/pages/Register/index'),
);

/*
 * 忘记密码
 */
export const ForgetPassword = lazy(() =>
  import(/* webpackChunkName: "ForgetPassword" */ '@/pages/ForgetPassword/index'),
);

/*
 * 基础查询表格
 */
export const BannerList = lazy(() =>
  import(/* webpackChunkName: "BannerList" */ '@/pages/Home/BannerList/List'),
);

/*
 * 可编辑查询表格
 */
export const EditTableList = lazy(() =>
  import(/* webpackChunkName: "EditTableList" */ '@/pages/Home/EditTableList/List'),
);
