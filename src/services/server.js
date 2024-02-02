import { post } from './index';

/* 查询所有区服 */
export const requestZoneList = (params) => post('zone/Zone/list', params, true);
