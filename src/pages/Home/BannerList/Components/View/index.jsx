import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import { Intl } from '@/components/system';

import styles from './index.scss';

function BannerListViewModal(props) {
  const { data = {}, title = '', visible = false, onCancel = (a) => a } = props;

  return (
    <Modal forceRender okText="返回" onCancel={onCancel} open={visible} title={title}>
      <div className={styles.BannerListViewModal}>
        <div className="BannerListViewModalItem">
          <label>{Intl.v('用户名')}</label>
          <div>{data.username}</div>
        </div>
      </div>
    </Modal>
  );
}

BannerListViewModal.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default BannerListViewModal;
