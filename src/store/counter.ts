import { createSlice } from '@reduxjs/toolkit';

interface IPayloadProps {
  payload: any;
  type: string;
}

const value = {
  currentIntl: 'zh_CN', //国际化

  dict: null, //字典

  antdTheme: {
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 5,
    },
    components: {
      Button: {
        colorPrimary: '#1677ff',
        algorithm: true,
      },
      Input: {
        colorPrimary: '#1677ff',
      },
    },
  }, //antd主题
  projectTheme: {
    colorPrimary: '#1677ff',
  }, //自定义主题
};

export const counter = createSlice({
  name: 'counter',
  initialState: { value },
  reducers: {
    //存储State
    onSetState: (state: any, action: IPayloadProps) => {
      if (action.payload === undefined) return;

      Object.keys(action.payload)?.forEach((item) => {
        state.value[item] = action.payload[item];
      });
    },

    //重置所有状态
    onResetState: (state: any) => {
      Object.keys(value).forEach((item) => {
        state.value[item] = value[item];
      });
    },

    //设置主题
    setAntdTheme: (state: any, action: IPayloadProps) => {
      const colorPrimary = action.payload?.colorPrimary;

      if (colorPrimary) {
        state.value.antdTheme.token.colorPrimary = colorPrimary;
        state.value.antdTheme.components.Button.colorPrimary = colorPrimary;

        state.value.projectTheme.colorPrimary = colorPrimary;
      }
    },
  },
});

export const { onSetState, setAntdTheme, onResetState } = counter.actions;

export default counter.reducer;
