import { LockFilled, SkinFilled } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { ProtectedButton, onSetState, useDispatch } from 'qg-react-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '@/services/login';

import LottieAnimation from '@/components/project/LottieAnimation';

import lotty1 from '@/assets/lotty/lot1.json';

import styles from './index.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //登录按钮
  const onFinish = async (values) => {
    const res = await requestLogin(values);

    // if (res?.code !== 200) {
    //   message.error(res?.msg);
    //
    //   return;
    // }

    dispatch(
      onSetState({
        token: res?.data?.Token || 'token',
        roleType: res?.data?.Username || 'admin',
        username: res?.data?.Nick || 'admin',
      }),
    );

    //跳转到上一次退出前选择的菜单项
    navigate('/');
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
      {/*动画*/}
      <LottieAnimation animationData={lotty1} />

      {/*标题*/}
      <div className={styles.LoginTitle}>欢迎进入QG-REACT演示项目</div>

      {/*分割线*/}
      <div className={styles.LoginLine}></div>

      {/*登录表单*/}
      <div className={styles.LoginFormBox}>
        <Form autoComplete="off" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名 admin',
              },
            ]}
          >
            <Input
              className={styles.LoginInput}
              placeholder="请输入用户名 admin"
              prefix={<SkinFilled />}
              size="large"
              value="admin"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码 123456',
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              className={styles.LoginInput}
              placeholder="请输入密码 123456"
              prefix={<LockFilled />}
              size="large"
              value="123456"
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
