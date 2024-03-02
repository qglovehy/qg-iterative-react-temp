import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
<<<<<<< HEAD
import React, { useRef } from 'react';
=======
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onSetState } from '@/store/counter';
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d

import Intl from '../../index';

import styles from './index.scss';

function IntlIndex() {
  const intlType = useRef(Intl.getAllLocals());

<<<<<<< HEAD
  const onIntlClick = ({ key }) => {
    localStorage.setItem('qg-iterative-react-locale', key);
=======
  // 当前语言
  const { currentIntl } = useSelector((state) => state.counter.value);

  //store 触发方法
  const dispatch = useDispatch();

  const onIntlClick = ({ key }) => {
    dispatch(onSetState({ intlType: key }));

    //main.js 无法获取最新state
    window.localStorage.setItem('qg-iterative-react-intl', key);
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d

    window.location.reload();
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    window.localStorage.setItem('qg-iterative-react-intl', currentIntl);
  }, [currentIntl]);

>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
  return (
    <div className={styles.IntlChange}>
      <Dropdown
        menu={{
          items: intlType.current,
          onClick: onIntlClick,
        }}
      >
        <div>
          <Space>
            <TranslationOutlined />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
}

export default IntlIndex;
