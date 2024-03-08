import { BgColorsOutlined } from '@ant-design/icons';
import { Drawer, Form, InputNumber } from 'antd';
import React, { FC, useLayoutEffect } from 'react';

import {
  FormComponents,
  IRootStateProps,
  ProtectedButton,
  setAntdTheme,
  useDispatch,
  useSelector,
} from '@/components/system';

import { IConfigDrawerProps } from './types';

//@ts-ignore
import styles from './index.scss';

const ConfigDrawer: FC<IConfigDrawerProps> = ({
  open = false,
  onClose = () => null,
  showConfigDrawer = () => null,
}) => {
  const { colorPrimary: rootColorPrimary } = useSelector(
    (state: IRootStateProps) => state.counter.value.projectTheme,
  );

  //store 触发方法
  const dispatch = useDispatch();

  //提交
  const onFinish = (theme: any) => dispatch(setAntdTheme(theme));

  const onFinishFailed = (errorInfo: any) => {
    console.error('ThemeChangeFormFailed:', errorInfo);
  };

  //修改主题颜色
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--primary-color', rootColorPrimary);
  }, [rootColorPrimary]);

  return (
    <div className={styles.Index}>
      <BgColorsOutlined onClick={showConfigDrawer} />

      <Drawer onClose={onClose} open={open} placement="right" title="主题设置">
        <Form
          autoComplete="off"
          layout="vertical"
          name="theme"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="主题色: " name="colorPrimary">
            <FormComponents init="SystemPrimaryColor" type="radio" />
          </Form.Item>

          <Form.Item label="组件方向: " name="direction">
            <FormComponents init="SystemDirection" type="radio" />
          </Form.Item>

          <Form.Item label="组件尺寸: " name="componentSize">
            <FormComponents init="SystemComponentSize" type="radio" />
          </Form.Item>

          <Form.Item label="圆角大小: " name="borderRadius">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <ProtectedButton htmlType="submit" type="primary">
              保存配置
            </ProtectedButton>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ConfigDrawer;
