import { post } from './index';

/* 查询列表 */
export const requestEditTableList = (params) => post('edit_table/EditTableManage/list', params);

/* 新增 */
export const requestEditTableSave = (params) => post('edit_table/EditTableManage/save', params);
