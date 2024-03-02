import { message } from 'antd';

import { onClearLoginOutTime, setLoading } from '@/utils/pubilc';

import { store } from '@/components/system';

export const config = {
<<<<<<< HEAD
  baseURL: 'http://localhost:8000/',
=======
  baseURL: 'http://127.0.0.1/',
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
  wsList: {
    docker: '127.0.0.1/',
    api: '127.0.0.1/',
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

<<<<<<< HEAD
export const post = async (url, data, noLoading, formatData) => {
=======
export const post = (url, data, noLoading, formatData) => {
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

<<<<<<< HEAD
  const token = store?.getState().counter.value.token;
=======
  const token = store?.getState()?.token?.value?.token;
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d

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
