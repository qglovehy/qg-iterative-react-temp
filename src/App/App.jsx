import { HappyProvider } from '@ant-design/happy-work-theme';
import { ConfigProvider, Spin, message as messageApi } from 'antd';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import 'dayjs/locale/zh-cn';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { ws } from '@/utils/webSocket';
import { prevState } from '@/store/init';

import Routers from '@/router/index';

import {
  MessageContext,
  initDictData,
  onResetState,
  onSetState,
  store,
  useDispatch,
  useSelector,
} from '@/components/system';

//当前语言
const currentLocale = localStorage.getItem('qg-iterative-react-locale') || 'zh_CN';

//预设的国际化文件
const locales = {
  zh_CN,
  en_US,
};

//antd 日期国际化单独处理
if (currentLocale === 'zh_CN') {
  dayjs.locale('zh-cn');
} else {
  dayjs.locale('en-us');
}

function AppIndex() {
  const [message, contextHolder] = messageApi.useMessage();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, token, antdTheme, componentSize, direction } = useSelector(
    (state) => state.counter.value,
  );

  useEffect(() => {
    //初始化预设状态
    // dispatch(onResetState());
    dispatch(onSetState({ ...prevState }));

    //初始化字典项
    initDictData(require.context('@/dictionary', false, /\.js$/)).then();

    if (token) {
      // 设置长链接
      // ws.initWebSocket();

      navigate('/index');

      //定时清除控制台
      // setInterval(console.clear, 120000);
    } else {
      //清空字典项
      dispatch(onSetState({ dict: [] }));

      navigate('/login');
    }
  }, [token]);

  //路由拦截
  useEffect(() => {
    dispatch(onSetState({ currentMenuItem: location.pathname }));
  }, [location]);

  return (
    <ConfigProvider
      componentSize={componentSize}
      direction={direction}
      locale={locales[currentLocale]}
      theme={{
        token: {
          colorPrimary: antdTheme.token.colorPrimary,
          borderRadius: antdTheme.token.borderRadius,
        },
        components: {
          Button: {
            colorPrimary: antdTheme.components.Button?.colorPrimary,
            algorithm: antdTheme.components.Button?.algorithm,
          },
        },
      }}
    >
      <MessageContext.Provider value={message}>
        {contextHolder}
        <Spin spinning={loading} style={{ top: '16%' }}>
          <HappyProvider>
            <Routers />
          </HappyProvider>
        </Spin>
      </MessageContext.Provider>
    </ConfigProvider>
  );
}

export default AppIndex;
