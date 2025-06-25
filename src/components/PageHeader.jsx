import React from 'react';
import styles from '../styles/PageHeader.module.css';

function PageHeader({ title, children }) {
  return (
    <header className={styles.pageHeader}>
      {title}
      {children}
    </header>
  );
}

export default PageHeader;
