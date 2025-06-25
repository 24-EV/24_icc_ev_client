import React from 'react';
import BottomAppBar from './BottomAppBar';
import '../styles/global.css';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      {/* 메인 컨텐츠 */}
      <main className={styles.main}>{children}</main>
      {/* 바텀앱바 */}
      <BottomAppBar />
    </div>
  );
}

export default Layout;
