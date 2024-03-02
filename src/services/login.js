import { post } from './index';

/* 登录 */
export const requestLogin = (params) => post('user/user/login', params);

/* 忘记密码 */
export const requestForgetPassword = (params) => post('user/user/update_password', params);

/* 注册 */
export const requestRegister = (params) => post('user/user/register', params);
