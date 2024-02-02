import { post } from './index';

//可疑进程相关

/* 添加异常进程 */
export const requestAddSupervise = (params) => post('user/user/AddSupervise', params);
