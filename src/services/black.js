import { post } from './index';

/* 列表 */
export const requestGetSuperviseUser = (params) => post('user/user/GetSuperviseUser', params, true);

/* 删除 */
export const requestClearSuperviseUser = (params) => post('user/user/DelSuperviseUser', params);
