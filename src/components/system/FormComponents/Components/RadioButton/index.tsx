import { Radio } from 'antd';
import React, { FC } from 'react';

import ConditionalRender from '../../../ConditionalRender';
import Img from '../../../Img';
import Svg from '../../../Svg';
import { IFormComponentsProps } from '../types';

//@ts-ignore
import styles from './index.scss';

const RadioButtonIndex: FC<IFormComponentsProps> = ({ componentProps = {}, dataSource = [] }) => (
  <Radio.Group {...componentProps} className={styles.RadioGroup}>
    {dataSource?.map?.((item) => (
      <Radio.Button
        className={styles.RadioButton}
        key={item.value}
        style={{ color: item.color }}
        value={item.value}
      >
        <ConditionalRender conditional={item.img}>
          {() => (
            <Img
              src={item.img}
              style={{
                width: item.width || '20px',
                height: item.height || '20px',
              }}
            />
          )}
        </ConditionalRender>

        <ConditionalRender conditional={item.icon}>
          {() => <Svg name={item.icon} size={item.size} />}
        </ConditionalRender>

        <span>{item.label}</span>
      </Radio.Button>
    ))}
  </Radio.Group>
);

export default RadioButtonIndex;
