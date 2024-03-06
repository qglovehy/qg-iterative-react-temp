import { post } from './index';

/* 列表 */
export const requestUserList = (params) => post('user/userManage/getUserList', params, true);

/* 删除 */
export const requestClearSuperviseUser = (params) =>
  post('user/user/DelSuperviseUser', params, true);
