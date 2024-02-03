//组件库内置雪碧图svg
import '@/assets';

//公共样式
import '@/styles/normalize.css';
import '@/styles/root.scss';

//持久化存储 redux
export { Provider, useDispatch, useSelector } from 'react-redux';
export { PersistGate } from 'redux-persist/lib/integration/react';
export { store, persistence } from '@/store';
export {
  default as QGIterativeReducer,
  onResetState,
  onSetState,
  setAntdTheme,
} from '@/store/counter';

//初始化字典
export { initDictData, Dict } from '@/utils/dictionaryData';

//自定义钩子
export { useSetState, useMediaQuery } from '@/hooks';

//国际化相关
export { default as Intl } from './Intl';
export { default as IntlDropdown } from './Intl/Components/IntlDropdown';

//公共组件
export { default as ConditionalRender } from './ConditionalRender';
export { default as BaseList } from './BaseList';
export { default as ListBody } from './BaseList/Components/ListBody';
export { default as EditTableListBody } from './BaseList/Components/EditTableListBody';
export { default as BreadcrumbNav } from './BreadcrumbNav';
export { default as DriverGroup } from './DriverGroup';
export { default as FormComponents } from './FormComponents';
export { default as FunctionControl } from './FunctionControl';
export { default as HistoryBack } from './HistoryBack';
export { default as Img } from './Img';
export { default as Pagination } from './Pagination';
export { default as ProtectedButton } from './ProtectedButton';
export { default as RenderDom } from './RenderDom';
export { default as SearchForm } from './SearchForm';
export { default as Svg } from './Svg';
export { default as ThemeSwitcher } from './ThemeSwitcher';

export { default as UnNormalCase403 } from './UnNormalCase/Error_403';
export { default as UnNormalCase404 } from './UnNormalCase/Error_404';
export { default as UnNormalCase500 } from './UnNormalCase/Error_500';

//WangEditor
export { default as WangEditorFrame } from './WangEditorFrame';
