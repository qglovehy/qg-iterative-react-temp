import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { ISvgProps } from './types';

//@ts-ignore
import styles from './index.scss';

const IconComponent: FC<ISvgProps> = (props) => {
  const { name = '', color = 'var(--font-3-color)', size = 16, className = '' } = props;

  return (
    <svg
      className={classNames(styles.SvgClass, className)}
      style={{
        color: color,
        fontSize: size + 'px',
      }}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

const MemoIconComponent = memo(IconComponent);

export default MemoIconComponent;
