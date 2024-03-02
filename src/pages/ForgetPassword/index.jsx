import { LockFilled, SkinFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestForgetPassword } from '@/services/login';

import LottieAnimation from '@/components/project/LottieAnimation';
import { MessageContext, ProtectedButton } from '@/components/system';

import lotty1 from '@/assets/lotty/lot1.json';

import styles from './index.scss';

function ForgetPassword() {
  const message = useContext(MessageContext);

  const navigate = useNavigate();

  //登录按钮
  const onFinish = async (values) => {
    if (values['password'] !== values['password_confirm']) {
      message.warning('新旧密码不一致');

      return;
    }

    const res = await requestForgetPassword(values);

    if (res?.code !== 200) {
      message.error(res?.msg);

      return;
    }

    message.success(res.msg);

    navigate('/login');
  };

  //表单输入错误事件
  const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

  //登录
  const onJumpLogin = () => navigate('/login');

  return (
    <div className={styles.ForgetPassword}>
      {/*动画*/}
      <LottieAnimation animationData={lotty1} />

      {/*标题*/}
      <div className={styles.ForgetPasswordTitle}>QG-REACT演示项目-修改密码</div>

      {/*分割线*/}
      <div className={styles.ForgetPasswordLine}></div>

      {/*表单*/}
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
            />
          </Form.Item>
          <Form.Item
            name="password_confirm"
            rules={[
              {
                required: true,
                message: '请输入确认密码 ',
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              className={styles.ForgetPasswordInput}
              placeholder="请输入确认密码 "
              prefix={<LockFilled />}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <ProtectedButton className={styles.ForgetPasswordBtn} htmlType="submit" type="primary">
              修改密码
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
