import { createContext } from 'react';

//组件库内置雪碧图svg
import '@/assets';

//公共样式
import '@/styles/root.scss';

import 'qg-react-components/lib/index.css';

//==========================组件库组件===================================================
//持久化存储 redux
export { Provider, useDispatch, useSelector } from 'qg-react-components'; //'react-redux';
export { PersistGate } from 'qg-react-components'; //'redux-persist/lib/integration/react';

export { onResetState, onSetState, setAntdTheme } from 'qg-react-components'; //'@/store/counter';

export { store, persistence } from 'qg-react-components'; //@/store
export type { IRootStateProps } from 'qg-react-components'; //@/store/types

export { Intl } from 'qg-react-components'; // './Intl'; //初始化国际化
export { IntlDropdown } from 'qg-react-components'; //  './Intl/Components/IntlDropdown'; //国际化组价

export { initDictData, Dict } from 'qg-react-components'; //'@/utils/dictionaryData'; //初始化字典

export { useSetState, useMediaQuery } from 'qg-react-components'; // '@/hooks'; //自定义钩子

//公共组件
export { BaseList } from 'qg-react-components'; //'./BaseList'; //基础查询表格
export { EditTableListBody } from 'qg-react-components'; //'./BaseList/Components/EditTableListBody'; //可编辑查询表格体
export { ListBody } from 'qg-react-components'; //'./BaseList/Components/ListBody'; //基础查询表格体
export { Svg } from 'qg-react-components'; //'./Svg'; //Svg雪碧图配合插件
export { DriverGroup } from 'qg-react-components'; //'./DriverGroup'; //自定义分割组
export { FunctionControl } from 'qg-react-components'; //'./FunctionControl'; //查询表格控件
export { ProtectedButton } from 'qg-react-components'; //'./ProtectedButton'; //权限按钮
export { Img } from 'qg-react-components'; //'./Img'; // 图片插入组件
export { BreadcrumbNav } from 'qg-react-components'; // './BreadcrumbNav'; //面包屑
export { FormComponents } from 'qg-react-components'; // './FormComponents';  //自定义表单组件
export { SearchForm } from 'qg-react-components'; //'./SearchForm'; //查询表单
export { Pagination } from 'qg-react-components'; //'./Pagination'; //分页
export { RenderDom } from 'qg-react-components'; //'./RenderDom'; //div 渲染dom
export { ThemeSwitcher } from 'qg-react-components'; //'./ThemeSwitcher'; //主题切换
export { ConditionalRender } from 'qg-react-components'; //'./ConditionalRender'; //条件渲染
export { WangEditorFrame } from 'qg-react-components'; //'./WangEditorFrame'; //iframe 包裹 富文本编辑器
export { HistoryBack } from 'qg-react-components'; //'./HistoryBack'; //返回组件
export { UnNormalCase403 } from 'qg-react-components'; //'./UnNormalCase/Error_403'; //错误页面403
export { UnNormalCase404 } from 'qg-react-components'; //'./UnNormalCase/Error_404'; //错误页面404
export { UnNormalCase500 } from 'qg-react-components'; //'./UnNormalCase/Error_500'; //错误页面500

// 创建一个Context
export const MessageContext = createContext(null);
