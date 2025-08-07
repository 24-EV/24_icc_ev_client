import React from 'react';
import styles from '../../styles/layout/PageHeader.module.css';

function PageHeader({ title }) {
  return <header className={styles.pageHeader}>{title}</header>;
}

export default PageHeader;
