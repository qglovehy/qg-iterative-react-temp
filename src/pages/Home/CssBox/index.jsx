import PropTypes from 'prop-types';
import React from 'react';

import styles from './index.scss';

function CssBox(props) {
  const { id = '' } = props;

  return <div className={styles.Index}></div>;
}

CssBox.propTypes = {
  id: PropTypes.string,
};

export default CssBox;
