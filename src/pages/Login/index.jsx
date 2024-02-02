import { LockFilled, SkinFilled } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { ProtectedButton, onSetState, useDispatch } from 'qg-react-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '@/services/login';

import styles from './index.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //登录按钮
  const onFinish = async (values) => {
    const res = await requestLogin(values);

    if (res?.code !== 200) {
      message.error(res?.msg);

      return;
    }

    dispatch(
      onSetState({
        token: res?.data?.Token,
        roleType: res?.data?.Username || 'user',
        username: res?.data?.Nick,
      }),
    );

    //跳转到上一次退出前选择的菜单项
    navigate('/userProcessList');
  };

  //表单输入错误事件
  const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

  useEffect(() => {
    const params = new URLSearchParams(window.location?.hash?.split('?')[1]);

    const username = params.get('username');
    const password = params.get('password');

    if (username && password) {
      onFinish({
        username,
        password,
      });
    }
  }, []);

  return (
    <div className={styles.Login}>
      <div className={styles.LoginFormBox}>
        <div className={styles.LoginTitle}>后台管理系统</div>
        <Form autoComplete="off" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input
              className={styles.LoginInput}
              placeholder="请输入用户名"
              prefix={<SkinFilled />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              className={styles.LoginInput}
              placeholder="请输入密码"
              prefix={<LockFilled />}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <ProtectedButton className={styles.LoginBtn} htmlType="submit" type="primary">
              登录
            </ProtectedButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
