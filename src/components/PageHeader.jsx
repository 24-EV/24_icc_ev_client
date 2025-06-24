import React from 'react';
import styles from '../styles/PageHeader.module.css';

function PageHeader({ title, children, style }) {
  return (
    <header className={styles.pageHeader} style={style}>
      {title}
      {children}
    </header>
  );
}

export default PageHeader;
