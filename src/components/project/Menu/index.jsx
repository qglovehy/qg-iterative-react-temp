import PropTypes from 'prop-types';
import { ConditionalRender, useMediaQuery, useSelector } from 'qg-react-components';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OptionRouter from '@/router/router';

//响应式切换
import PADMenu from './Components/PADMenu';
import PCMenu from './Components/PCMenu';

function MenuIndex(props) {
  const { openMenuDraw = false, onCloseMenuDraw = () => {} } = props;

  const boolMediaQuery = useMediaQuery([992]);

  const { collapsed, currentMenuItem, menuWidth, roleType } = useSelector(
    (state) => state.counter.value,
  );

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [openKeys, setOpenKeys] = useState([]);

  //递归 生成items
  const getRouteJson = (OptionRouter) => {
    if (!OptionRouter || !Array.isArray(OptionRouter)) return;

    return OptionRouter.map(({ label, path, icon, children, isAuthenticated }) => {
      if (icon && (!isAuthenticated || isAuthenticated?.includes?.(roleType))) {
        return {
          key: path,
          label,
          icon,
          children: children?.length > 0 && getRouteJson(children),
        };
      }
    });
  };

  const onOpenChange = (item) => setOpenKeys(item);

  //菜单子项点击事件
  const onMenuItemClick = ({ key }) => {
    if (key) navigate(key);
  };

  useEffect(() => {
    const currentMenuItemList =
      currentMenuItem
        ?.split('/')
        ?.filter(Boolean)
        ?.reduce((acc, curr, i) => {
          i === 0 ? acc.push(curr) : acc.push(`${acc[i - 1]}/${curr}`);

          return acc;
        }, [])
        ?.map((item) => `/${item}`) || [];

    setOpenKeys(collapsed ? [] : currentMenuItemList);
  }, [collapsed]);

  useEffect(() => {
    //从二级路由开始渲染菜单项
    setItems(getRouteJson(OptionRouter[1].children)?.filter(Boolean));
  }, []);

  return (
    <ConditionalRender
      conditional={boolMediaQuery[0]}
      noMatch={() => (
        <PADMenu
          currentMenuItem={currentMenuItem}
          items={items}
          menuWidth={menuWidth}
          onCloseMenuDraw={onCloseMenuDraw}
          onMenuItemClick={onMenuItemClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          openMenuDraw={openMenuDraw}
        />
      )}
    >
      {() => (
        <PCMenu
          collapsed={collapsed}
          currentMenuItem={currentMenuItem}
          items={items}
          menuWidth={menuWidth}
          onMenuItemClick={onMenuItemClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
        />
      )}
    </ConditionalRender>
  );
}

const MemoMenuIndex = memo(MenuIndex);

MenuIndex.propTypes = {
  openMenuDraw: PropTypes.bool,
  onCloseMenuDraw: PropTypes.func,
};

export default MemoMenuIndex;
