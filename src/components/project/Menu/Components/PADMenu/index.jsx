import { Drawer, Menu } from 'antd';
import PropTypes from 'prop-types';
import { onSetState, useDispatch, useSelector } from 'qg-react-components';
import React from 'react';

import styles from './index.scss';

function PADMenuIndex(props) {
  const dispatch = useDispatch();

  const {
    currentMenuItem = '/',
    items = [],
    menuWidth = 256,
    openKeys = [],
    onMenuItemClick = (a) => {},
    onOpenChange = (a) => {},
  } = props;

  const { openMenuDraw } = useSelector((state) => state.counter.value);

  return (
    <Drawer
      className={styles.PADMenuIndex}
      closable={false}
      key="left"
      onClose={() => dispatch(onSetState({ openMenuDraw: false }))}
      open={openMenuDraw}
      placement="left"
      title={false}
      width={menuWidth}
    >
      <Menu
        items={items}
        mode="inline"
        onClick={onMenuItemClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={[currentMenuItem]}
        theme="light"
      />
    </Drawer>
  );
}

PADMenuIndex.propTypes = {
  currentMenuItem: PropTypes.string,
  items: PropTypes.array,
  menuWidth: PropTypes.number,
  onMenuItemClick: PropTypes.func,
  onOpenChange: PropTypes.func,
  openKeys: PropTypes.array,
};

export default PADMenuIndex;
