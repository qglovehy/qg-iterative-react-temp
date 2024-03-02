import { LockFilled, SkinFilled } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import React, { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestRegister } from '@/services/login';

import LottieAnimation from '@/components/project/LottieAnimation';
import { ProtectedButton } from '@/components/system';

import lotty1 from '@/assets/lotty/lot1.json';

import styles from './index.scss';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    startTransition(async () => {
      const res = await requestRegister(values);

      if (res?.code !== 200) {
        message.error(res?.msg);

        return;
      }

      message.success(res.msg);
      navigate('/login');
    });
  };

  //表单输入错误事件
  const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

  //去登录
  const onJumpLogin = () => navigate('/login');

  return (
    <div className={styles.Register}>
      {/*动画*/}
      <LottieAnimation animationData={lotty1} />

      {/*标题*/}
      <div className={styles.RegisterTitle}>QG-REACT演示项目-注册</div>

      {/*分割线*/}
      <div className={styles.RegisterLine}></div>

      {/*注册表单*/}
      <div className={styles.RegisterFormBox}>
        <Form autoComplete="off" name="reg" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input
              className={styles.RegisterInput}
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
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              className={styles.RegisterInput}
              placeholder="请输入密码"
              prefix={<LockFilled />}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <ProtectedButton className={styles.RegisterBtn} htmlType="submit" type="primary">
              注册
            </ProtectedButton>
          </Form.Item>
        </Form>

        <div className={styles.RegisterFormBoxOther}>
          <ProtectedButton onClick={onJumpLogin} type="link">
            去登录
          </ProtectedButton>
        </div>
      </div>
    </div>
  );
}

export default Register;
