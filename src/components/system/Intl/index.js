import intl from 'react-intl-universal';

import { store } from '@/components/system';

import en_US_List from './locales/en_US';
import zh_CN_List from './locales/zh_CN';

//init react-intl
let objLocales = {
  currentLocale: 'zh_CN',
  locales: {},
};

//预设的国际化文件
const locales = {
  zh_CN: {
    zh_CN_List,
    desc: '简体中文',
  },
  en_US: {
    en_US_List,
    desc: '英文',
  },
};

//存储intl.get所需key
let initKey = {};

const Intl = {
  //初始化国际化
  init: (zhList = []) => {
    const currentLocale = localStorage.getItem('qg-iterative-react-locale') || 'zh_CN';

    //初始化国际化参数-增强代码可读性
    initKey = {};

    //初始化国际化参数
    objLocales = {
      currentLocale,
      locales: {},
    };

    //国际化所需KEY
    const intlKeyList = [];

    if (!Array.isArray(zhList)) {
      console.error('Intl组件：init传入的国际化数据不是数组');
    }

    //合并项目自定义国际化文字
    locales.zh_CN.zh_CN_List = locales.zh_CN.zh_CN_List.concat(zhList);

    locales?.zh_CN?.zh_CN_List?.forEach?.((value, i) => {
      const key = `t_${i}`;

      intlKeyList.push(key);

      initKey[value] = key;
    });

    for (const key in locales) {
      //获取语言类型下的所有文字项
      const languages = [...(locales[key][`${key}_List`] || [])];

      const obj = {};

      languages?.forEach((item, i) => {
        obj[intlKeyList[i]] = item;
      });

      //存储国际化所需的JSON结构
      objLocales.locales[key] = obj;
    }

    //初始化
    return intl.init(objLocales);
  },

  //自定义国际化函数
  v: (key = '', option = {}) => (initKey?.[key] ? intl.get(initKey[key], option) : ''),

  //自定义国际化函数 转dom
  vHtml: (key = '', option = {}) => (initKey?.[key] ? intl.getHTML(initKey[key], option) : ''),

  //获取所有预设国际化索引信息
  getAllLocals: () =>
    Object.keys(locales)?.map((name) => ({
      key: name,
      label: locales[name]['desc'],
    })),
};

export default Intl;
