import { message } from 'antd';
import { store } from 'qg-react-components';

import { onClearLoginOutTime, setLoading } from '@/utils/pubilc';

export const config = {
  baseURL: 'http://103.117.121.53/',
  wsList: {
    docker: '192.168.1.102:8881/',
    api: '103.117.121.53/',
  },
  timeout: 15000,
};

//处理超时问题
function fetchWithTimeout(url, requestOptions) {
  return Promise.race([
    fetch(config.baseURL + url, requestOptions),
    new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时')), config?.timeout)),
  ]);
}

export const post = (url, data, noLoading, formatData) => {
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  const token = store?.getState()?.token?.value?.token;

  if (token) myHeaders.set('Authorization', token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };

  //文件上传 需传入formatData 其他接口正常
  if (formatData) {
    requestOptions['body'] = formatData;
  } else {
    data && (requestOptions['body'] = JSON.stringify(data));
  }

  //是否  不展示loading遮罩
  !noLoading && setLoading(true);

  return fetchWithTimeout(url, requestOptions)
    .then(async (res) => {
      setLoading(false);

      if (res?.status === 404) {
        throw new Error(`接口不存在：${res?.status} | ${res?.statusText}`);
      }

      if (res?.status === 500) {
        throw new Error(`服务器无响应：${res?.status} | ${res?.statusText}`);
      }

      if (res?.status < 200 || res?.status >= 300) {
        throw new Error(`请求错误：${res?.status} | ${res?.statusText}`);
      }

      const data = await res?.json();

      //token过期
      if (data?.code === -2) {
        onClearLoginOutTime();
      }

      return data;
    })
    .catch(async (err) => {
      setLoading(false);

      message.error(err?.toString());
    });
};
