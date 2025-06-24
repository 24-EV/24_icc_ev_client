import React from 'react';
import BottomAppBar from './BottomAppBar';
import '../styles/global.css';

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 메인 컨텐츠 */}
      <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      {/* 바텀앱바 */}
      <BottomAppBar />
    </div>
  );
}

export default Layout;
