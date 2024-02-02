import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import styles from './index.scss';

function BannerListViewModal(props) {
  const { data = {}, title = '', visible = false, onCancel = () => {} } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      const rec = { ...(data || {}) };

      form.setFieldsValue(rec);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal forceRender okText="返回" onCancel={onCancel} open={visible} title={title}>
      <Form className={styles.BannerListViewModal} form={form}>
        <Form.Item label="用户名称：" name="Users">
          <Input maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

BannerListViewModal.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onSetModalStatus: PropTypes.func,
};

export default BannerListViewModal;
