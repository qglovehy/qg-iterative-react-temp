import App from '@/App/App';

import { message } from 'antd';
import { Intl, PersistGate, Provider, onSetState, persistence, store } from 'qg-react-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { state } from '@/store';

import '@/assets';

import zh_CN_List from './locales/zh_CN';

import '@/styles/root.scss';

import 'qg-react-components/lib/index.css';

const currentLocale = window.localStorage.getItem('qg-iterative-react-intl') || 'zh_CN';

//配置antd 弹窗
message?.config({
  top: 10,
  duration: 3,
  maxCount: 3,
  rtl: true,
});

//初始化国际化
Intl?.init(currentLocale, zh_CN_List)?.then(async (err) => {
  if (err) {
    message.warning('国际化初始化失败');

    return;
  }

  store.dispatch(onSetState({ ...state }));

  //注入src绝对路径
  const root = ReactDOM.createRoot(document.getElementById('app'));

  root.render(
    <Provider store={store}>
      {/*如果使用React,则使用 PersistGate 包裹根组建*/}
      <PersistGate loading={null} persistor={persistence}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>,
  );
});
