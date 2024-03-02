import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { IImgProps } from './types';

//@ts-ignore
import styles from './index.scss';

const isProduction = process.env.NODE_ENV === 'production';
const path = isProduction ? `/${process.env.PUBLIC_PATH}` : '';

const Img: FC<IImgProps> = ({
  src = '',
  alt = '',
  replace = `${path}/imgs/store.png`,
  className = '',
  style = {},
}) => (
  <img
    alt={alt}
    className={classNames(styles.Img, className)}
    src={(src.includes('http') ? src : path + src) || replace}
    style={style}
  />
);

const MemoImg = memo(Img);

export default MemoImg;
