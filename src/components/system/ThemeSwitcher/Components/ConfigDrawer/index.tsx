import { BgColorsOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { Drawer, Form, InputNumber, message } from 'antd';
=======
import { Drawer, Form, Radio, Tooltip } from 'antd';
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
import React, { FC, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAntdTheme } from '@/store/counter';
import { IRootStateProps } from '@/store/types';

<<<<<<< HEAD
import { FormComponents } from '@/components/system';

=======
import Intl from '../../../Intl';
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
import ProtectedButton from '../../../ProtectedButton';
import { IConfigDrawerProps } from './types';

//@ts-ignore
import styles from './index.scss';

<<<<<<< HEAD
=======
const colorPrimary = [
  {
    label: '暗黑',
    value: '#001529',
  },
  {
    label: '拂晓',
    value: '#1677ff',
  },
  {
    label: '薄暮',
    value: '#f5222d',
  },
  {
    label: '火山',
    value: '#fa541c',
  },
  {
    label: '日暮',
    value: '#faad14',
  },
  {
    label: '明清',
    value: '#13c2c2',
  },
  {
    label: '极光',
    value: '#52c41a',
  },
  {
    label: '极客',
    value: '#2f54eb',
  },
  {
    label: '酱紫',
    value: '#722ed1',
  },
];

>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
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
<<<<<<< HEAD
  const onFinish = (theme: any) => dispatch(setAntdTheme(theme));
=======
  const onFinish = (colorPrimary: any) => dispatch(setAntdTheme(colorPrimary));
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d

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
<<<<<<< HEAD
          layout="vertical"
          name="theme"
=======
          initialValues={{
            colorPrimary: colorPrimary[0].value,
          }}
          layout="vertical"
          name="basic"
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="主题色: " name="colorPrimary">
<<<<<<< HEAD
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
=======
            <Radio.Group buttonStyle="solid">
              {colorPrimary?.map?.((item) => (
                <Tooltip key={item.value} placement="top" title={Intl.v(item.label)}>
                  <Radio.Button
                    style={{
                      background: item.value,
                      padding: '0px 20px',
                    }}
                    value={item.value}
                  ></Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
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
