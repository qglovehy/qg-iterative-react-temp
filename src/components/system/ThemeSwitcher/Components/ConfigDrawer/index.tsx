import { BgColorsOutlined } from '@ant-design/icons';
import { Drawer, Form, Radio, Tooltip } from 'antd';
import React, { FC, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAntdTheme } from '@/store/counter';
import { IRootStateProps } from '@/store/types';

import Intl from '../../../Intl';
import ProtectedButton from '../../../ProtectedButton';
import { IConfigDrawerProps } from './types';

//@ts-ignore
import styles from './index.scss';

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
  const onFinish = (colorPrimary: any) => dispatch(setAntdTheme(colorPrimary));

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
          initialValues={{
            colorPrimary: colorPrimary[0].value,
          }}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="主题色: " name="colorPrimary">
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
