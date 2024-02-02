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
 * 可疑进程列表
 */
export const BannerList = lazy(() =>
  import(/* webpackChunkName: "BannerList" */ '@/pages/Home/BannerList/List'),
);
