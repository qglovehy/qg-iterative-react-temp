import React, { FC } from 'react';

import { IDriverProps } from './types';

//@ts-ignore
import styles from './index.scss';

const Divider: FC<IDriverProps> = ({
  size = 0,
  symbol,
  type = 'horizontal',
  height = '100%',
  width = '1px',
  color = 'var(--font-3-color)',
}) => {
  const style: React.CSSProperties = {};

  style.color = color;

  if (type === 'horizontal') {
    if (!symbol) {
      style.height = height;
      style.width = width;
      style.backgroundColor = color;
      style.padding = `0 ${size}px`;
    }
  } else {
    style.padding = `${size}px 0`;
  }

  return (
    <div style={style}>
      {symbol ? <div>{symbol}</div> : null}
      {type === 'vertical' && <div className={styles.DividerVertical}>{symbol}</div>}
    </div>
  );
};

export default Divider;
