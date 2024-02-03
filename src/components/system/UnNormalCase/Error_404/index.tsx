import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Intl from '../../Intl';
import ProtectedButton from '../../ProtectedButton';

const Error_404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      extra={
        <ProtectedButton onClick={() => navigate('/')} type="primary">
          {Intl.v('返回首页')}
        </ProtectedButton>
      }
      status="404"
      subTitle={Intl.v('页面未找到')}
      title="404"
    />
  );
};

export default Error_404;
