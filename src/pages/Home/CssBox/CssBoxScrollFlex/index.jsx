import React from 'react';

import styles from './index.scss';

function CssBoxScrollFlex() {
  return (
    <div className={styles.CssBoxScrollFlex}>
      {new Array(100).fill(1)?.map((_, index) => (
        <div className="content" key={index}>
          继续滚动页面，看看发生了什么！
        </div>
      ))}

      <div className={styles.CssBoxScrollFlexElement}>我在滚动到顶部时会固定在这里</div>

      {new Array(300).fill(1)?.map((_, index) => (
        <div className="content" key={index}>
          继续滚动页面，看看发生了什么！
        </div>
      ))}
    </div>
  );
}

export default CssBoxScrollFlex;
