// import { requestZoneList } from '@/services/server';

const Dict = {
  //(静态字典、动态字典正反向Map自动生成 所以不需要手动添加)
  //静态字典
  DictStatic: {
    //性别
    SystemSex: () => [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 2,
      },
    ],
    //是否
    SystemWhetherOrNot: () => [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
  },
  //动态字典
  DictDynamic: {
    //区服列表
    // SystemZoneList: async () => {
    //   const res = await requestZoneList({ game_type_id: 1 });
    //
    //   if (!res?.data) return [];
    //
    //   return res?.data?.map((item) => ({
    //     label: item.name,
    //     value: item.id,
    //   }));
    // },
  },
};

export default Dict;
