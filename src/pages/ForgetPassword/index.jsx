import { LockFilled, SkinFilled } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import React, { startTransition, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestForgetPassword } from '@/services/login';

import LottieAnimation from '@/components/project/LottieAnimation';
import { ProtectedButton } from '@/components/system';

import lotty1 from '@/assets/lotty/lot1.json';

import styles from './index.scss';

function ForgetPassword() {
  const navigate = useNavigate();

  //登录按钮
  const onFinish = async (values) => {
    startTransition(async () => {
      const res = await requestForgetPassword(values);

      if (res?.code !== 200) {
        message.error(res?.msg);

        return;
      }

      message.success(res.msg);

      navigate('/');
    });
  };

  //表单输入错误事件
  const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

  //登录
  const onJumpLogin = () => navigate('/login');

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
    <div className={styles.ForgetPassword}>
      {/*动画*/}
      <LottieAnimation animationData={lotty1} />

      {/*标题*/}
      <div className={styles.ForgetPasswordTitle}>QG-REACT演示项目-修改密码</div>

      {/*分割线*/}
      <div className={styles.ForgetPasswordLine}></div>

      {/*登录表单*/}
      <div className={styles.ForgetPasswordFormBox}>
        <Form autoComplete="off" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名 ',
              },
            ]}
          >
            <Input
              className={styles.ForgetPasswordInput}
              placeholder="请输入用户名 "
              prefix={<SkinFilled />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码 ',
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              className={styles.ForgetPasswordInput}
              placeholder="请输入密码 "
              prefix={<LockFilled />}
              size="large"
              value="123456"
            />
          </Form.Item>

          <Form.Item>
            <ProtectedButton className={styles.ForgetPasswordBtn} htmlType="submit" type="primary">
              登录
            </ProtectedButton>
          </Form.Item>
        </Form>

        <div className={styles.ForgetPasswordFormBoxOther}>
          <ProtectedButton onClick={onJumpLogin} type="link">
            去登录
          </ProtectedButton>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
