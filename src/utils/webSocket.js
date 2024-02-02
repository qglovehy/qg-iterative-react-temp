import { Modal } from 'antd';
import dayjs from 'dayjs';
import { onSetState, store } from 'qg-react-components';

import protobuf from '@/utils/proto/proto';

import { config } from '@/services';

export const ws = {
  wsMessageObj: {},
  wsSetIntl: null,
  wsObj: null, //webSocket对象
  reconnectAttempts: 0, //当前连接次数
  maxReconnectAttempts: 10, //最大尝试次数
  initWebSocket: (callback = () => {}) => {
    const token = store.getState()?.counter.value.token;

    if (!token) {
      console.error('ws-token无效');

      return;
    }

    const docker = config.wsList.docker;
    const api = config.wsList.api;

    let wsBaseUrl = api;

    if (!config.baseURL.includes('wscon')) wsBaseUrl = docker;

    const wsStr = `ws://${wsBaseUrl}chat/socket.io?authorization=` + token;

    ws.wsObj = new WebSocket(wsStr);

    ws.wsObj.onopen = function (e) {
      console.log('ws已经打开', e);

      ws.reconnectAttempts = 0; // 重置重连尝试次数

      clearInterval(ws.wsSetIntl);

      console.log('ws已连接：前端开始刷新后端定时任务');

      //前端刷新后端定时任务
      ws.wsSetIntl = setInterval(() => {
        ws.wsObj?.send?.(
          createProtobufMessage({
            type: 'HeatBeat',
            content: 'ping',
          }),
        );
      }, 10000);

      callback?.();
    };

    ws.wsObj.onmessage = async function (e) {
      try {
        const data = await decodePBMessage(e.data);

        console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), ': ws收到消息: ', data);

        if (!data.type) {
          throw new Error('未找到type');
        }

        if (!ws.wsMessageObj[data.type]) {
          ws.wsMessageObj[data.type] = {};
        }

        ws.wsMessageObj[data.type]['data'] = data;

        console.log(`消息处理完毕：${data.type}-${data.messageType}`);

        //首次连接
        if (data.type === 'FirstConnect') {
          if (!data.to) {
            console.log('To未发现');

            return;
          }

          store?.dispatch(onSetState({ socketId: data.to }));

          return;
        }

        //获取消息
        if (data.type === 'Notice') {
          Modal?.confirm({
            title: '来自管理员的消息',
            content: data.content || '来自管理员的消息',
          });

          return;
        }
      } catch (err) {
        console.error('websocketJs-catch: ', err.message);
      }
    };

    ws.wsObj.onclose = function (event) {
      setTimeout(() => onReConnection('ws触发关闭-close', event), 3000);

      ws.wsMessageObj = {};

      clearInterval(ws.wsSetIntl);
    };

    ws.wsObj.onerror = function (_) {
      console.error('ws连接失败！');

      ws.wsMessageObj = {};

      clearInterval(ws.wsSetIntl);
    };
  },

  //发送无返回的消息
  sendSingleMessage: (params = {}) => {
    const createParams = { ...params };

    if (ws.wsObj?.readyState === 1) {
      const socketId = store.getState()?.counter.value.socketId;

      if (!socketId) {
        console.error('socketId未找到');

        return;
      }

      createParams['from'] = socketId;

      ws.wsObj?.send?.(createProtobufMessage(createParams));

      console.log(`已发送消息${params.type}-${params.messageType}=>`, createParams);
    } else {
      console.error(`ws未连接，未发送消息： ${params.type}`);
    }
  },
};

//加密消息
export const createProtobufMessage = (data) => {
  const message = protobuf.lookup('protocol.Message');

  const messagePB = message?.create?.(data);

  return message?.encode?.(messagePB).finish();
};

//解密消息
export const decodePBMessage = async (data) => {
  const messageProto = protobuf.lookup('protocol.Message');

  const arrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = reject;

    if (data instanceof Blob) {
      reader.readAsArrayBuffer(data);
    } else {
      reject(new Error('protobuf=> Data must be an instance of Blob'));
    }
  });

  const uint8Array = new Uint8Array(arrayBuffer);

  return messageProto?.decode(uint8Array);
};

//断开重连
const onReConnection = (type, event) => {
  // const readyState = ws.wsObj?.readyState;
  //
  // if (ws.wsObj && (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN)) {
  //   console.log('已控制重连次数');
  //
  //   return;
  // }

  console.log(type + ': ws已断开,已重连', event);

  // ws.reconnectAttempts++;

  // ws.initWebSocket();
};
