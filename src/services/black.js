import { post } from './index';

/* 列表 */
export const requestUserList = (params) => post('user/userManage/getUserList', params, true);

/* 删除 */
export const requestDelUserById = (params) => post('user/userManage/delUserById', params, true);

/* 新增 */
export const requestSaveUser = (params) => post('user/userManage/saveUser', params, true);

/* 修改 */
export const requestUpdateUser = (params) => post('user/userManage/updateUser', params, true);
