import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useRef } from 'react';

import { Intl } from '@/components/system';

import styles from './index.scss';

function IntlIndex() {
  const intlType = useRef(Intl.getAllLocals());

  const onIntlClick = ({ key }) => {
    localStorage.setItem('qg-iterative-react-locale', key);

    window.location.reload();
  };

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
