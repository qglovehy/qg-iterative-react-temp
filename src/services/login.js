import { post } from './index';

/* 登录 */
export const requestLogin = (params) => post('user/login/login', params);

/* 忘记密码 */
export const requestForgetPassword = (params) => post('user/login/login', params);

/* 注册 */
export const requestRegister = (params) => post('user/register/register', params);
