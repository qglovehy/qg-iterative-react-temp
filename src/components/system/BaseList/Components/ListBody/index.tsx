import { Table } from 'antd';
import classNames from 'classnames';
import React, { ForwardRefRenderFunction, forwardRef, memo, useImperativeHandle } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { IListBodyProps } from './types';

// @ts-ignore
import styles from './index.scss';

const ListBody: ForwardRefRenderFunction<unknown, IListBodyProps> = (
  {
    columns = [],
    dataSource = [],
    rowSelection = false,
    otherParams = {},
    tableDensity = 'small',
    scrollX = null,
    scrollY = 0,
    className = '',
  },
  ref,
) => {
  useImperativeHandle(ref, () => ({
    onSearch: () => {},
  }));

  //列表体
  return (
    <div className={styles.ListBody}>
      <Table
        className={classNames(styles.ListBodyTable, className)}
        {...otherParams}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record?.rowKey || uuidV4()}
        rowSelection={typeof rowSelection === 'object' ? rowSelection : undefined}
        scroll={{
          y: scrollY!,
          x: scrollX!,
          scrollToFirstRowOnChange: true,
        }}
        size={tableDensity}
      />
    </div>
  );
};

const Index = memo(forwardRef<unknown, IListBodyProps>(ListBody));

export default Index;
