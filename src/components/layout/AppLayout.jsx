import React, { useContext, useMemo, useState } from 'react';
import BottomAppBar from './BottomAppBar';
import TopAppBar from './TopAppBar';
import { SocketContext } from '../../context/SocketContext';
import DarkModeCard from '../common/DarkModeCard';
import DownloadExcelForm from '../forms/DownloadExcelForm';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import '../../styles/global.css';
import styles from '../../styles/layout/AppLayout.module.css';
import useHistory from '../../hooks/useHistory';

function AppLayout({ children }) {
  const ctx = useContext(SocketContext);
  const { realTimeClock, isConnected, totalData } = ctx;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 최근 데이터 수신 시간(몇 초 전)
  const lastReceived = useMemo(() => {
    if (!totalData?.timestamp) return null;
    const t = new Date(totalData.timestamp).getTime();
    const diffSec = Math.floor((Date.now() - t) / 1000);
    if (diffSec < 2) return '방금 전';
    if (diffSec < 60) return `${diffSec}초 전`;
    return `${Math.floor(diffSec / 60)}분 전`;
  }, [totalData]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <TopAppBar
          rtc={realTimeClock ? realTimeClock.timestamp : '수신 중...'}
          isConnected={isConnected}
          lastReceived={lastReceived}
          onMenuClick={() => setDrawerOpen(true)}
        />
      </div>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        PaperProps={{
          className: styles.drawerPaper
        }}
      >
        <div className={styles.drawerContent}>
          <h2 className={styles.drawerTitle}>설정</h2>
          <DarkModeCard />
          <DownloadExcelForm />
          <div>
            <h1 className={styles.helpTitle}>도움말</h1>
          </div>
        </div>
      </SwipeableDrawer>
      <main className={styles.main}>{children}</main>
      <div className={styles.bottomBar}>
        <BottomAppBar />
      </div>
    </div>
  );
}

export default AppLayout;
