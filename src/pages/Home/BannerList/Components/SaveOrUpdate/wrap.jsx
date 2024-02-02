import { message } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { requestAddSupervise } from '@/services/abnormalProgress';
import { updateAwardData } from '@/services/drawList';

import Index from './index';

function BannerListWrap(props) {
  const { data = {}, onCancel = () => {} } = props;

  const ref = useRef();

  function onSubmit() {
    ref.current?.form
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
        onCancel();
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
