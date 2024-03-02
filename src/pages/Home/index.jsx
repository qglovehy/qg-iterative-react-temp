import { Skeleton } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MenuIndex from '@/components/project/Menu';

import Header from './Components/Header';

import styles from './index.scss';

function HomeIndex() {
  return (
    <div className={styles.Home}>
      {/* 上 */}
      <Header />

      {/* 中 */}
      <section className={styles.HomeSection}>
        {/* 左侧导航栏 */}
        <aside className={styles.HomeSectionAside}>
          <MenuIndex />
        </aside>

        {/* 右侧页面内容 嵌套路由 */}
        <article className={styles.HomeSectionArticle}>
          <Suspense fallback={<Skeleton active />}>
            <Outlet />
          </Suspense>
        </article>
      </section>

      {/* 下 */}
      <footer className={styles.HomeFooter}></footer>
    </div>
  );
}

export default HomeIndex;
