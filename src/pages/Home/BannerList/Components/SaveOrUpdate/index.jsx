import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './index.scss';

function BannerListModal(props, ref) {
  const { onSubmit = () => null, title = '', visible = false, onCancel = () => null } = props;

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
        <Form.Item hidden name="Id">
          <Input />
        </Form.Item>
        <Form.Item label="用户名称：" name="Users">
          <Input maxLength={200} />
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
