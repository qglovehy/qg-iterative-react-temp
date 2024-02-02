import { UnNormalCase403, UnNormalCase404, useSelector } from 'qg-react-components';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import OptionRouter from './router';

//递归遍历 route
function RouteItem(OptionRouter, roleType) {
  if (!OptionRouter) return;

  //isAuthenticated  判断路由权限
  return OptionRouter?.map?.(({ element, path, id, children, isAuthenticated }) => (
    <Route
      element={
        !isAuthenticated || isAuthenticated?.includes?.(roleType) ? element : <UnNormalCase403 />
      }
      key={id}
      path={path}
    >
      {children && RouteItem(children, roleType)}
    </Route>
  ));
}

function RouterOption() {
  const { roleType } = useSelector((state) => state.counter.value);

  const Error404 = <Route element={<UnNormalCase404 />} key="404" path="*" />;

  return <Routes>{[...RouteItem(OptionRouter, roleType), Error404] || Error404}</Routes>;
}

export default RouterOption;
