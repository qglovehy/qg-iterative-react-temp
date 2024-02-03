import React from 'react';

export interface IProtectedButtonProps {
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  type: 'default' | 'link' | 'text' | 'primary' | 'dashed';
  htmlType?: 'button' | 'submit' | 'reset';
}
