import { Checkbox } from 'antd';
import React, { FC } from 'react';

import { IFormComponentsProps } from '../types';

//@ts-ignore
import styles from './index.scss';

const CheckBoxIndex: FC<IFormComponentsProps> = ({ componentProps = {}, dataSource = [] }) => (
  <div className={styles.CheckBoxIndex}>
    <Checkbox.Group options={dataSource} {...componentProps} />
  </div>
);

export default CheckBoxIndex;
