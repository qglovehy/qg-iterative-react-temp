import { Select } from 'antd';
import React, { FC } from 'react';

import { IFormComponentsProps } from '../types';

const { Option } = Select;

const SelectIndex: FC<IFormComponentsProps> = ({ componentProps = {}, dataSource = [] }) => (
  <Select {...componentProps} allowClear optionFilterProp="label" showSearch>
    {dataSource?.map((item) => (
      <Option key={item.value} label={item.label} value={item.value}>
        {item.label}
      </Option>
    ))}
  </Select>
);

export default SelectIndex;
