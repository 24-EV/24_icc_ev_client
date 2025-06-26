import React, { useContext, useMemo, useState, useEffect } from 'react';
import BottomAppBar from '../BottomAppBar';
import TopAppBar from '../TopAppBar';
import { SocketContext } from '../../context/SocketContext';
import DarkModeCard from './DarkModeCard';
import DownloadExcelForm from '../DownloadExcelForm';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import '../../styles/global.css';
import styles from '../../styles/Layout.module.css';
import useHistory from '../../hooks/useHistory';

function AppLayout({ children }) {
  const ctx = useContext(SocketContext);
  const { realTimeClock, isConnected, vehicleData, hvData, motorData, gpsData } = ctx;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { addHistory } = useHistory();
  // 최근 데이터 수신 시간(몇 초 전)
  const lastReceived = useMemo(() => {
    if (!vehicleData || !vehicleData.timestamp) return null;
    const now = Date.now();
    const t = new Date(vehicleData.timestamp).getTime();
    const diffSec = Math.floor((now - t) / 1000);
    if (diffSec < 2) return '방금 전';
    if (diffSec < 60) return `${diffSec}초 전`;
    return `${Math.floor(diffSec / 60)}분 전`;
  }, [vehicleData]);

  // 실시간 데이터가 들어올 때마다 history에 추가
  useEffect(() => {
    if (vehicleData && vehicleData.timestamp) {
      addHistory({
        vehicleData,
        hvData,
        motorData,
        gpsData,
        realTimeClock
      });
    }
  }, [vehicleData, hvData, motorData, gpsData, realTimeClock, addHistory]);

  return (
    <div className={styles.container}>
      <TopAppBar
        rtc={realTimeClock ? realTimeClock.timestamp : '수신 중...'}
        isConnected={isConnected}
        lastReceived={lastReceived}
        onMenuClick={() => setDrawerOpen(true)}
      />
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        PaperProps={{
          className: 'drawer',
          sx: {
            background: 'var(--color-bg)',
            color: '#fff',
            width: 340,
            maxWidth: '90vw',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: 0
          }
        }}
      >
        <div
          style={{
            padding: 16,
            minHeight: '100vh',
            overflowX: 'hidden',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            background: 'var(--color-bg)'
          }}
        >
          <h2
            style={{
              color: 'var(--color-text)',
              fontWeight: 700,
              fontSize: '2rem',
              textAlign: 'center',
              margin: '24px 0 32px 0'
            }}
          >
            설정
          </h2>
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DarkModeCard />
          <DownloadExcelForm />
        </div>
      </SwipeableDrawer>
      {/* 메인 컨텐츠 */}
      <main className={styles.main}>{children}</main>
      {/* 바텀앱바 */}
      <BottomAppBar />
    </div>
  );
}

export default AppLayout;
