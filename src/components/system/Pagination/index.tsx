import { Pagination } from 'antd';
import React, { FC, memo } from 'react';

import { Intl } from '@/components/system';

import { IPaginationProps } from './types';

//@ts-ignore
import styles from './index.scss';

const PaginationIndex: FC<IPaginationProps> = ({
  onChange = () => {},
  onShowSizeChange = () => {},
  size = 'default',
  total = 0,
  current = 1,
  pageSize = 10,
  pageSizeOptions = [25, 50, 100, 150, 200, 500, 1000, 1000000],
  showQuickJumper = true,
  showSizeChanger = true,
}) => (
  <Pagination
    className={styles.PaginationIndex}
    current={current} //当前页
    onChange={onChange} //分页状态改变
    onShowSizeChange={onShowSizeChange} //是否展示
    pageSize={pageSize} //当前页数据条数
    pageSizeOptions={pageSizeOptions} //每页条数选项
    showQuickJumper={showQuickJumper} //页码跳转
    showSizeChanger={showSizeChanger}
    showTotal={(total, range) =>
      Intl.v('当前 {page}-{pageSize}/共 {total}条', {
        page: range[0],
        pageSize: range[1],
        total,
      })
    } //总数自定义
    size={size} //大小
    total={total} //总数
  />
);

const MemoPaginationIndex = memo(PaginationIndex);

export default MemoPaginationIndex;
