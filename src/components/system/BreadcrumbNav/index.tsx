import { CaretRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ConditionalRender, IRootStateProps } from '@/components/system';

import { IBreadcrumbNavProps } from './types';

//@ts-ignore
import styles from './index.scss';

const BreadcrumbNav: FC<IBreadcrumbNavProps> = ({
  firstTitle = '',
  separator = <CaretRightOutlined />,
  onClick = (a: any) => a,
}) => {
  const { breadcrumb = [] } = useSelector((state: IRootStateProps) => state.counter.value);

  const memoFirst = useMemo(
    () => [
      {
        title: (
          <i>
            {firstTitle || '导航'} <CaretRightOutlined />
          </i>
        ),
      },
      ...breadcrumb.reduce((acc, current) => {
        if (acc.findIndex((item: { title: any }) => item.title === current.title) === -1) {
          acc.push(current);
        }

        return acc;
      }, []),
    ],
    [breadcrumb],
  );

  return (
    <Space className={styles.BreadcrumbNav} size={2}>
      {memoFirst?.map((item, index) => (
        <div
          className={styles.BreadcrumbNavItem}
          key={index}
          // @ts-ignore
          onClick={() => (index !== 0 ? onClick(item) : window.location.reload())}
        >
          <ConditionalRender conditional={index > 1}>{() => separator}</ConditionalRender>

          <div className={classNames(index > 0 && styles.BreadcrumbNavTitle)}>{item.title}</div>
        </div>
      ))}
    </Space>
  );
};

export default BreadcrumbNav;
