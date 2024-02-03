import classNames from 'classnames';
import React, { FC, Fragment, useMemo } from 'react';
import * as ReactIs from 'react-is';

import Divider from './Components/Divider';
import { IDriverGroupProps } from './types';

//@ts-ignore
import styles from './index.scss';

const DriverGroup: FC<IDriverGroupProps> = (props) => {
  const { children, className = '', type = 'horizontal', style = {} } = props;

  const filterChildren = useMemo(() => {
    if (Array.isArray(children)) {
      return (children || [])?.filter(Boolean);
    }

    return children;
  }, [children]);

  const childrenFlat = useMemo(() => {
    const flat: any[] = [];

    function loop(_children) {
      React.Children.map(_children, (child: any) => {
        if (ReactIs.isFragment(child)) {
          loop(child?.props?.children?.filter(Boolean));
        } else {
          flat.push(child);
        }
      });
    }

    loop(filterChildren);

    return flat;
  }, [filterChildren]);

  if (React.Children.count(filterChildren) <= 1) return filterChildren;

  return (
    <div
      className={classNames(
        styles.DriverGroup,
        type === 'horizontal' && styles.DividerHorizontal,
        className,
      )}
      style={style}
    >
      {childrenFlat.map((child, index) => {
        if (index === 0) return child;

        return (
          <Fragment key={index}>
            <Divider {...props} />
            {child}
          </Fragment>
        );
      })}
    </div>
  );
};

export default DriverGroup;
