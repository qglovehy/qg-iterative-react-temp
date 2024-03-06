import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './index.scss';

function BannerListModal(props, ref) {
  const { onSubmit = () => null, title = '', visible = false, onCancel = (a) => a } = props;

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  return (
    <Modal
      cancelText="取消"
      forceRender
      okText="确认"
      onCancel={onCancel}
      onOk={onSubmit}
      open={visible}
      title={title}
    >
      <Form className={styles.BannerListModal} form={form}>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item label="用户名称：" name="username">
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item label="密码：" name="password">
          <Input maxLength={100} type="password" />
        </Form.Item>
        <Form.Item label="确认密码：" name="password_confirm">
          <Input maxLength={100} type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const Index = forwardRef(BannerListModal);

BannerListModal.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Index;
