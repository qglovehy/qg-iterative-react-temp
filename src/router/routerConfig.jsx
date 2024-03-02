import { lazy } from 'react';

import ForgetPasswordIndex from '@/pages/ForgetPassword';
import Home from '@/pages/Home';
import LoginIndex from '@/pages/Login';
import RegisterIndex from '@/pages/Register';

/*
 * 首页
 */
export const HomeIndex = Home;

/*
 * 登录页
 */
export const Login = LoginIndex;

/*
 * 注册
 */
export const Register = RegisterIndex;

/*
 * 忘记密码
 */
export const ForgetPassword = ForgetPasswordIndex;

/*
 * 首页
 */
export const IndexPage = lazy(() =>
  import(/* webpackChunkName: "IndexPage" */ '@/pages/Home/IndexPage/index'),
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
