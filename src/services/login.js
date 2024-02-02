import { post } from './index';

/* 查询所有数据 */
export const requestLogin = (params) => post('user/Login', params);
