import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onSetState } from '@/store/counter';

import Intl from '../../index';

import styles from './index.scss';

function IntlIndex() {
  const intlType = useRef(Intl.getAllLocals());

  // 当前语言
  const { currentIntl } = useSelector((state) => state.counter.value);

  //store 触发方法
  const dispatch = useDispatch();

  const onIntlClick = ({ key }) => {
    dispatch(onSetState({ intlType: key }));

    //main.js 无法获取最新state
    window.localStorage.setItem('qg-iterative-react-intl', key);

    window.location.reload();
  };

  useEffect(() => {
    window.localStorage.setItem('qg-iterative-react-intl', currentIntl);
  }, [currentIntl]);

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
