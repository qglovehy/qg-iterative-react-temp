//处理字典文件生成对象、Map
import { store } from '@/store';
import { onSetState } from '@/store/counter';

const path = require('path');

const SetDict = async (dictFiles) => {
  if (!dictFiles) {
    console.error('传入的Dict参数无效！');

    return;
  }

  //最终字典项
  const FormDict = {};

  //字典文件
  const Dictionary = {};

  //添加字典文件项
  dictFiles?.keys()?.forEach((key) => {
    const name = path.basename(key, '.js');

    Dictionary[name] = dictFiles(key)?.default || dictFiles(key);
  });

  //生成字典对应组件  将数据分配给 不同类型组件
  for (let fileName of Object.keys(Dictionary)) {
    //分静态字典 和 动态字典
    const { DictStatic, DictDynamic, DictPublicMap } = Dictionary[fileName];

    //添加公共Map
    for (let item of Object.keys(DictPublicMap)) {
      FormDict[item] = Dictionary[fileName]['DictPublicMap'][item]();
    }

    //添加静态字典
    for (let item of Object.keys(DictStatic)) {
      const staticDict = Dictionary[fileName]['DictStatic'][item]();

      FormDict[item] = staticDict;

      //添加静态Map
      FormDict[`${item}Map`] = new Map([
        ...staticDict?.map((item) => [item.label, item.value]),
        ...staticDict?.map((item) => [item.value, item.label]),
      ]);
    }

    //添加动态字典
    for (let item of Object.keys(DictDynamic)) {
      const dynamicDict = await Dictionary[fileName]['DictDynamic'][item]();

      FormDict[item] = dynamicDict;

      //添加动态Map
      FormDict[`${item}Map`] = new Map([
        ...dynamicDict?.map((item) => [item.label, item.value]),
        ...dynamicDict?.map((item) => [item.value, item.label]),
      ]);
    }
  }

  return FormDict;
};

//遍历字典文件
export async function initDictData(dictFiles) {
  try {
    const dict = await SetDict(dictFiles);

    store?.dispatch(onSetState({ dict }));

    return dict;
  } catch (err) {
    return err;
  }
}

//获取当前字典文件
export const Dict = () => store.getState()?.counter.value.dict;
