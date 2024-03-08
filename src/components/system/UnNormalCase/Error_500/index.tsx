import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Intl, ProtectedButton } from '@/components/system';

const Error_500 = () => {
  const navigate = useNavigate();

  return (
    <Result
      extra={
        <ProtectedButton onClick={() => navigate('/')} type="primary">
          {Intl.v('返回首页')}
        </ProtectedButton>
      }
      status="500"
      subTitle={Intl.v('服务器发生错误')}
      title="500"
    />
  );
};

export default Error_500;
