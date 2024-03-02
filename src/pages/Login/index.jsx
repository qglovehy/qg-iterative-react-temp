import { LockFilled, SkinFilled } from '@ant-design/icons';
<<<<<<< HEAD
import { Form, Input, message } from 'antd';
=======
import { Form, Input } from 'antd';
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '@/services/login';

import LottieAnimation from '@/components/project/LottieAnimation';
import { ProtectedButton, onSetState, useDispatch } from '@/components/system';

import lotty1 from '@/assets/lotty/lot1.json';

import styles from './index.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //登录按钮
  const onFinish = async (values) => {
    const res = await requestLogin(values);

<<<<<<< HEAD
    if (res?.code !== 200) {
      message.error(res?.msg);

      return;
    }

    dispatch(
      onSetState({
        token: res?.data?.token || 'token',
        roleType: res?.data?.username || 'admin',
        username: res?.data?.username || 'admin',
      }),
    );

=======
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
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
    navigate('/');
  };

  //表单输入错误事件
  const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

<<<<<<< HEAD
  //注册
  const onJumpRegister = () => navigate('/register');

  //忘记密码
  const onJumpForgectPassword = () => navigate('/forgetpassword');

=======
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
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
<<<<<<< HEAD

        <div className={styles.LoginFormBoxOther}>
          <ProtectedButton onClick={onJumpRegister} type="link">
            注册
          </ProtectedButton>
          <ProtectedButton onClick={onJumpForgectPassword} type="link">
            忘记密码
          </ProtectedButton>
        </div>
=======
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
      </div>
    </div>
  );
}

export default Login;
