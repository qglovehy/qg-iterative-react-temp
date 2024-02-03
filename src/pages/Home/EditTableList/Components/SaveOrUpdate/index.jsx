import { DatePicker, Form, Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { saveAwardData, updateAwardData } from '@/services/drawList';

import { FormComponents, Intl, WangEditorFrame } from '@/components/system';

import styles from './index.scss';

const { TextArea } = Input;

function LocalizedModal({ data, title, onSetModalStatus, visible }) {
  const [form] = Form.useForm();

  //保存
  async function onSubmit() {
    const values = await form?.validateFields()?.catch((err) => console.error(err));

    const params = { ...values };

    if (params?.id) {
      //编辑
      const res = await updateAwardData(values);

      if (res?.data?.code === 0) {
        message.success(res?.data?.msg);
      } else {
        message.error(res?.data?.msg);
      }
    } else {
      //新增
      params?.id && delete params['id'];

      const res = await saveAwardData(values);

      if (res?.data?.code === 0) {
        message.success(res?.data?.msg);
      } else {
        message.error(res?.data?.msg);
      }
    }

    //关闭Modal
    onSetModalStatus(false);
  }

  useEffect(() => {
    if (data) {
      const formData = { ...(data || {}) };

      formData['date1'] = dayjs(formData['date1'], 'YYYY/MM/DD');
      formData['datetime1'] = dayjs(formData['datetime1'], 'YYYY/MM/DD HH:mm:ss');

      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal
      cancelText={Intl.v('取消')}
      centered
      className={styles.UserProcessListModalBox}
      forceRender
      okText={Intl.v('确认')}
      onCancel={() => onSetModalStatus(false)}
      onOk={onSubmit}
      open={visible}
      title={title}
    >
      <Form className={styles.UserProcessListModal} form={form} labelCol={{ span: 4 }}>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item label={Intl.v('输入框')} name="input1">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label={Intl.v('数字框')} name="number1">
          <Input placeholder="请输入" type="number" />
        </Form.Item>
        <Form.Item label={Intl.v('下拉框')} name="select1">
          <FormComponents init="SystemSex" placeholder="请选择" type="select" />
        </Form.Item>
        <Form.Item label={Intl.v('单选框')} name="radio1">
          <FormComponents init="SystemSex" placeholder="请选择" type="radio" />
        </Form.Item>
        <Form.Item label={Intl.v('日期')} name="date1">
          <DatePicker />
        </Form.Item>
        <Form.Item label={Intl.v('时间')} name="datetime1">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label={Intl.v('文本框')} name="textarea1">
          <TextArea placeholder="请输入"></TextArea>
        </Form.Item>
        <Form.Item label={Intl.v('富文本编辑器')} name="editor1">
          <WangEditorFrame width={900} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LocalizedModal;
