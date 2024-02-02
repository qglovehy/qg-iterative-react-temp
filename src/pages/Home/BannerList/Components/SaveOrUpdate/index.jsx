import { Form, Input, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { requestAddSupervise } from '@/services/abnormalProgress';
import { updateAwardData } from '@/services/drawList';

import styles from './index.scss';

function AbnormalProgressModal(props) {
  const { data = {}, title = '', visible = false, onSetModalStatus = () => {} } = props;

  const [form] = Form.useForm();

  function onClose() {
    onSetModalStatus(false);
  }

  function onSubmit() {
    form
      .validateFields()
      .then(async (values) => {
        const params = { ...values };

        if (params?.Id) {
          //编辑  调用接口的方法需要自定义
          const res = await updateAwardData(values);

          if (res?.code === 0) {
            message.success(res?.msg);
          } else {
            message.error(res?.msg);
          }
        } else {
          //新增 调用接口的方法需要自定义
          params?.Id && delete params['Id'];

          const res = await requestAddSupervise(values);

          if (res?.code === 200) {
            message.success(res?.msg);
          } else {
            message.error(res?.msg);
          }
        }

        //关闭Modal
        onSetModalStatus(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (data) {
      const rec = { ...(data || {}) };

      form.setFieldsValue(rec);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal
      cancelText="取消"
      forceRender
      okText="确认"
      onCancel={onClose}
      onOk={onSubmit}
      open={visible}
      title={title}
    >
      <Form className={styles.AbnormalProgressModal} form={form}>
        <Form.Item hidden name="Id">
          <Input />
        </Form.Item>
        <Form.Item label="可疑进程名：" name="Name">
          <Input maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

AbnormalProgressModal.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onSetModalStatus: PropTypes.func,
};

export default AbnormalProgressModal;
