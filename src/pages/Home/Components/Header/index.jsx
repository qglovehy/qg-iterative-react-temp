import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {
  ConditionalRender,
  Intl,
  IntlDropdown,
  Svg,
  ThemeSwitcher,
  onResetState,
  onSetState,
  useDispatch,
  useMediaQuery,
  useSelector,
} from 'qg-react-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onClearLoginOutTime } from '@/utils/pubilc';

import styles from './index.scss';

const menuItems = [
  {
    label: '清除缓存',
    key: '1',
  },
  {
    label: '退出登录',
    key: '2',
  },
];

function HeaderIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boolMediaQuery = useMediaQuery([992]);

  const { username, openMenuDraw } = useSelector((state) => state.counter.value);

  const [openConfigDrawer, setOpenConfigDrawer] = useState(false);

  //用户名悬浮下拉
  const onMenuClick = ({ key }) => {
    switch (key) {
      case '1':
        onClearRefresh();
        break;
      case '2':
        confirm();
        break;
      default:
        break;
    }
  };

  //清除缓存
  const onClearRefresh = () => dispatch(onResetState());

  //登出
  const confirm = () => {
    navigate('/login');

    onClearLoginOutTime();
  };

  //打开主题切换抽屉
  const showConfigDrawer = () => setOpenConfigDrawer(true);

  //关闭主题切换抽屉
  const onCloseConfigDrawer = () => setOpenConfigDrawer(false);

  //返回首页并刷新
  const onBackHome = () => {
    navigate('/');

    window.location.reload();
  };

  return (
    <header className={styles.HomeHeader}>
      {/*左侧*/}
      <div className={styles.HomeHeaderLeft}>
        {/*切换菜单抽屉*/}
        <ConditionalRender
          conditional={boolMediaQuery[0]}
          noMatch={() => (
            <div onClick={() => dispatch(onSetState({ openMenuDraw: !openMenuDraw }))}>
              {openMenuDraw ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}
        >
          {() => (
            <Space className={styles.HomeHeaderTitle} onClick={onBackHome}>
              <Svg name="headertitle" size={22} />
              <span>{Intl.v('后台管理系统')}</span>
            </Space>
          )}
        </ConditionalRender>
      </div>

      {/*右侧*/}
      <Space className={styles.HomeHeaderRight} size={20}>
        {/*账号信息*/}
        <Dropdown
          menu={{
            items: menuItems,
            onClick: onMenuClick,
          }}
        >
          <Space>
            {username}
            <DownOutlined />
          </Space>
        </Dropdown>

        {/*主题切换*/}
        <div className={styles.HomeHeaderIntlBox}>
          <ThemeSwitcher
            onClose={onCloseConfigDrawer}
            open={openConfigDrawer}
            showConfigDrawer={showConfigDrawer}
          />
        </div>

        {/*国际化*/}
        <div className={styles.HomeHeaderIntlBox}>
          <IntlDropdown />
        </div>
      </Space>
    </header>
  );
}

export default HeaderIndex;
