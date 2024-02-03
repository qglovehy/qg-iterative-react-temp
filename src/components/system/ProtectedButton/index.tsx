import { Button } from 'antd';
import React, { FC, memo } from 'react';

import { IProtectedButtonProps } from './types';

const ProtectedButton: FC<IProtectedButtonProps> = (props) => {
  const { children, ...restProps } = props;

  return <Button {...restProps}>{children}</Button>;
};

const MemoProtectedButton = memo(ProtectedButton);

export default MemoProtectedButton;
