import App from '@/App/App';

import { message } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { StyleProvider } from '@ant-design/cssinjs';

import { state } from '@/store/init';

import { Intl, PersistGate, Provider, onMergeState, persistence, store } from '@/components/system';

import '@/assets';

import zh_CN_List from './locales/zh_CN';

import '@/styles/root.scss';

//配置antd 弹窗
message?.config({
  top: 10,
  duration: 3,
  maxCount: 3,
  rtl: true,
});

//初始化国际化
Intl?.init(zh_CN_List)?.then(async (err) => {
  if (err) {
    message.warning('国际化初始化失败');

    return;
  }

  //合并初始化状态
  store.dispatch(onMergeState({ ...state }));

  //注入src绝对路径
  const root = ReactDOM.createRoot(document.getElementById('app'));

  root.render(
    <Provider store={store}>
      {/*如果使用React,则使用 PersistGate 包裹根组建*/}
      <PersistGate loading={null} persistor={persistence}>
        <HashRouter>
          <StyleProvider hashPriority="high">
            <App />
          </StyleProvider>
        </HashRouter>
      </PersistGate>
    </Provider>,
  );
});
