import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

import type { IConditionalRenderProps, IConditionalRenderShowProps } from './types';

//@ts-ignore
import styles from './index.scss';

// 定义基础组件
const ConditionalRender: FC<IConditionalRenderProps> & {
  Show: FC<IConditionalRenderShowProps>;
} = ({ conditional = false, noMatch = () => null, children = () => null }) =>
  conditional ? children() : noMatch();

ConditionalRender.Show = ({ children = () => null, className = '', conditional = true }) => (
  <div className={classNames(className, !conditional && styles.ConditionalRenderHidden)}>
    {children()}
  </div>
);

export default ConditionalRender;
