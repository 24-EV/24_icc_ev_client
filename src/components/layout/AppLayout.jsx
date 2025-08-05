import React, { useContext, useMemo, useState, useEffect } from 'react';
import BottomAppBar from './BottomAppBar';
import TopAppBar from './TopAppBar';
import { SocketContext } from '../../context/SocketContext';
import Drawer from './Drawer';
import '../../styles/global.css';
import styles from '../../styles/layout/AppLayout.module.css';
import useHistory from '../../hooks/useHistory';

function AppLayout({ children }) {
  const ctx = useContext(SocketContext);
  const { isConnected, totalData } = ctx;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { history, addHistory } = useHistory();

  const timestampHistory = history.map((h) => h.timestamp);
  const latest = timestampHistory[timestampHistory.length - 1];

  const [lastReceived, setLastReceived] = useState('없음');

  // 최근 데이터 수신 시간(몇 초 전)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!latest) {
        setLastReceived('없음');
        return;
      }

      const t = new Date(latest).getTime();
      if (isNaN(t)) {
        setLastReceived('없음');
        return;
      }

      const diffSec = Math.floor((Date.now() - t) / 1000);
      if (diffSec < 2) setLastReceived('방금 전');
      else if (diffSec < 60) setLastReceived(`${diffSec}초 전`);
      else setLastReceived(`${Math.floor(diffSec / 60)}분 전`);
    }, 1000); // 매 1초마다 갱신

    return () => clearInterval(interval);
  }, [latest]);

  // 실시간 데이터가 들어올 때마다 history에 추가
  useEffect(() => {
    if (totalData?.timestamp !== null) {
      addHistory(totalData);
    }
  }, [totalData]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <TopAppBar
          rtc={isConnected ? totalData.timestamp : '수신 중...'}
          isConnected={isConnected}
          lastReceived={lastReceived}
          onMenuClick={() => setDrawerOpen(true)}
        />
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
      <main className={styles.main}>{children}</main>
      <div className={styles.bottomBar}>
        <BottomAppBar />
      </div>
    </div>
  );
}

export default AppLayout;
