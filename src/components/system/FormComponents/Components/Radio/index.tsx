import { Radio } from 'antd';
import React, { FC } from 'react';

import { IFormComponentsProps } from '../types';

const RadioIndex: FC<IFormComponentsProps> = ({ componentProps = {}, dataSource = [] }) => (
  <Radio.Group {...componentProps}>
    {dataSource?.map?.((item) => (
      <Radio key={item.value} style={{ color: item.color }} value={item.value}>
        {item.label}
      </Radio>
    ))}
  </Radio.Group>
);

export default RadioIndex;
