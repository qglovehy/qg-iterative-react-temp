import { post } from './index';

/* 列表 */
export const requestGetSuperviseUser = (params) => ({
  code: 200,
  data: [{ Users: '张三', CreateTime: '2024-1-1' }],
});

/* 删除 */
export const requestClearSuperviseUser = (params) => post('user/user/DelSuperviseUser', params);
