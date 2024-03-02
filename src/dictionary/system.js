// import { requestZoneList } from '@/services/server';

const Dict = {
  DictPublicMap: {},
  //(静态字典、动态字典正反向Map自动生成 所以不需要手动添加)
  //静态字典
  DictStatic: {
    //组件方向
    SystemDirection: () => [
      {
        label: '左→右',
        value: 'ltr',
      },
      {
        label: '左→右',
        value: 'rtl',
      },
    ],
    //组件尺寸
    SystemComponentSize: () => [
      {
        label: '小',
        value: 'small',
      },
      {
        label: '中',
        value: 'middle',
      },
      {
        label: '大',
        value: 'large',
      },
    ],
    //主题颜色
    SystemPrimaryColor: () => [
      {
        label: '暗黑',
        value: '#001529',
        color: '#001529',
      },
      {
        label: '拂晓',
        value: '#1677ff',
        color: '#1677ff',
      },
      {
        label: '薄暮',
        value: '#f5222d',
        color: '#f5222d',
      },
      {
        label: '火山',
        value: '#fa541c',
        color: '#fa541c',
      },
      {
        label: '日暮',
        value: '#faad14',
        color: '#faad14',
      },
      {
        label: '明清',
        value: '#13c2c2',
        color: '#13c2c2',
      },
      {
        label: '极光',
        value: '#52c41a',
        color: '#52c41a',
      },
      {
        label: '极客',
        value: '#2f54eb',
        color: '#2f54eb',
      },
      {
        label: '酱紫',
        value: '#722ed1',
        color: '#722ed1',
      },
    ],
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
