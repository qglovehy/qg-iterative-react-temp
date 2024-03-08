import { Layout, Space } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConditionalRender, ProtectedButton } from '@/components/system';

import { IHistoryBackProps } from './types';

//@ts-ignore
import styles from './index.scss';

const { Header, Content } = Layout;

const HistoryBack: FC<IHistoryBackProps> = ({
  title = '',
  optionButton = [],
  isShowBackButton = true,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.HistoryBack}>
      {/* 头部 */}
      <Header className={styles.HistoryBackHeader}>
        {/* 左侧标题 */}
        <div>{title}</div>

        {/* 右侧按钮 */}
        <div className={styles.HistoryBackBtn}>
          <Space className={styles.HistoryBackSpace}>
            {/* 其他按钮 */}
            {optionButton}

            {/* 是否展示返回按钮 */}
            <ConditionalRender conditional={isShowBackButton}>
              {() => (
                <ProtectedButton onClick={() => navigate(-1)} type="default">
                  返回
                </ProtectedButton>
              )}
            </ConditionalRender>
          </Space>
        </div>
      </Header>

      {/* 内容区域 */}
      <Content className={styles.HistoryBackContent}>{children}</Content>
    </Layout>
  );
};

export default HistoryBack;
