//import { post } from './index';

/* 查询所有数据 */
export const getDrawAllData = async (params) =>
  // let res = await post('/getDataList', params);
  ({
    data: [
      {
        id: 1,
        title: 'WoW1.exe',
        people: '大师森川葵',
        people2: '大师森川葵',
        switch1: '是',
      },
      {
        id: 2,
        title: 'WoW2.exe',
        people: '大师森川葵',
        people2: '大师森川葵',
        switch1: '否',
      },
      {
        id: 3,
        title: 'WoW3.exe',
        people: '大师森川葵',
        people2: '大师森川葵',
        switch1: '否',
      },
      {
        id: 4,
        title: 'WoW4.exe',
        people: '大师森川葵',
        people2: '大师森川葵',
        switch1: '否',
      },
      {
        id: 5,
        title: 'WoW5.exe',
        people: '大师森川葵',
        people2: '大师森川葵',
        switch1: '否',
      },
    ],
    total: 20,
    params,
    code: 200,
  });

/* 上传图片 */
export const saveAwardImg = (params) => ({ params });

/* 新增 */
export const saveAwardData = (params) => ({ params });

/* 修改 */
export const updateAwardData = (params) => ({ params });

/* 下线 */
export const downAwradInfoById = (params) => ({ params });
