import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FloatButton, Menu } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import { toggleCollapsed } from '@/utils/pubilc';

import styles from './index.scss';

function PCMenuIndex(props) {
  const {
    collapsed = false,
    currentMenuItem = '/',
    items = [],
    menuWidth = 256,
    openKeys = [],
    onMenuItemClick = () => {},
    onOpenChange = () => {},
  } = props;

  return (
    <div
      className={styles.PCMenuIndex}
      style={{
        width: menuWidth,
      }}
    >
      <Menu
        inlineCollapsed={collapsed}
        items={items}
        mode="inline"
        onClick={onMenuItemClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={[currentMenuItem]}
        theme="light"
      />

      <FloatButton
        className={styles.CollapsedBtn}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggleCollapsed(collapsed)}
      />
    </div>
  );
}

PCMenuIndex.propTypes = {
  collapsed: PropTypes.bool,
  currentMenuItem: PropTypes.string,
  items: PropTypes.array,
  menuWidth: PropTypes.number,
  onMenuItemClick: PropTypes.func,
  onOpenChange: PropTypes.func,
  openKeys: PropTypes.array,
};

export default PCMenuIndex;
