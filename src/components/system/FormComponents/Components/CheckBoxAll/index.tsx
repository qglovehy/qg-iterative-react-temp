import { Checkbox, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { IFormComponentsProps } from '../types';

//@ts-ignore
import styles from './index.scss';

const CheckBoxAllIndex: FC<IFormComponentsProps> = ({ componentProps = {}, dataSource = [] }) => {
  //全选按钮 半选状态
  // let indBool =
  //  (dataSource.value || []).length < dataSource.length && (dataSource.value || []).length > 0;

  // const [indeterminate, setIndeterminate] = useState(indBool);

  //全选按钮
  const [checkAll, setCheckAll] = useState(
    (componentProps.value || []).length !== dataSource.length,
  );

  useEffect(() => {
    setCheckAll((componentProps.value || []).length === dataSource.length);
  }, [componentProps.value, dataSource]);

  return (
    <Space className={styles.CheckBoxAllIndex} direction="vertical">
      <div>
        <Checkbox
          checked={checkAll}
          // indeterminate={indeterminate}
          onChange={(e) => {
            if (e.target.checked) {
              componentProps.onChange(dataSource.map((t) => t.value));
            } else {
              componentProps.onChange([]);
            }
          }}
        >
          全选
        </Checkbox>
      </div>
      <div>
        <Checkbox.Group {...componentProps} options={dataSource} />
      </div>
    </Space>
  );
};

export default CheckBoxAllIndex;
