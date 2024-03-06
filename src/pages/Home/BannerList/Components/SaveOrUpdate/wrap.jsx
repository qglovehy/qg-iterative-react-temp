import { message } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { requestSaveUser, requestUpdateUser } from '@/services/black';

import Index from './index';

function BannerListWrap(props) {
  const { data = {}, onCancel = (a) => a } = props;

  const ref = useRef();

  function onSubmit() {
    ref.current?.form
      .validateFields()
      .then(async (values) => {
        const params = { ...values };

        if (params?.id) {
          //编辑  调用接口的方法需要自定义
          const res = await requestUpdateUser(values);

          if (res?.code === 200) {
            message.success(res?.msg);

            //关闭Modal
            onCancel(true);
          } else {
            message.error(res?.msg);
          }
        } else {
          //新增 调用接口的方法需要自定义
          params?.id && delete params['Id'];

          const res = await requestSaveUser(values);

          if (res?.code === 200) {
            message.success(res?.msg);

            //关闭Modal
            onCancel(true);
          } else {
            message.error(res?.msg);
          }
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (data) {
      const rec = { ...(data || {}) };

      ref.current?.form.setFieldsValue(rec);
    } else {
      ref.current?.form.resetFields();
    }
  }, [data]);

  return <Index {...props} onSubmit={onSubmit} ref={ref} />;
}

BannerListWrap.propTypes = {
  data: PropTypes.object,
  onCancel: PropTypes.func,
};

export default BannerListWrap;
