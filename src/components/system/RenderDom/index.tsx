import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { IRenderDomProps } from './types';

//@ts-ignore
import styles from './index.scss';

const RenderDom: FC<IRenderDomProps> = ({ dom = '', className = '', style = {} }) => (
  <div
    className={classNames(styles.RenderDomIndex, className)}
    dangerouslySetInnerHTML={{ __html: dom.replace(/<script>/g, '') }}
    style={style}
  />
);

const MemoRenderDom = memo(RenderDom);

export default MemoRenderDom;
