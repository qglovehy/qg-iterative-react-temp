import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Intl, ProtectedButton } from '@/components/system';

const Error_403 = () => {
  const navigate = useNavigate();

  return (
    <Result
      extra={
        <ProtectedButton onClick={() => navigate('/')} type="primary">
          {Intl.v('返回首页')}
        </ProtectedButton>
      }
      status="403"
      subTitle={Intl.v('您没有访问此页面的权限')}
      title="403"
    />
  );
};

export default Error_403;
