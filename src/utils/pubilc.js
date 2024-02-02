import { onSetState, store } from 'qg-react-components';

import { ws } from '@/utils/webSocket';

//处理token过期问题 退出登录
export const onClearLoginOutTime = () => {
  store?.dispatch(
    onSetState({
      token: null,
      roleType: null,
      username: null,
    }),
  );

  ws.wsObj?.close();
};

//菜单缩放
export const toggleCollapsed = (collapsed) =>
  //菜单项宽度缩放优化
  store?.dispatch(
    onSetState({
      collapsed: !collapsed,
      menuWidth: !collapsed ? 75 : 223,
    }),
  );

//设置loading遮罩
export const setLoading = (loading) => store?.dispatch(onSetState({ loading }));

//file对象转base64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
