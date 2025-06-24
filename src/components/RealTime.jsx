import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import StatusBanner from './common/StatusBanner';
import styles from '../styles/RealTime.module.css';

function RealTime() {
  const { realTimeClock, socketError, loading, isConnected } = useContext(SocketContext);

  // 에러/로딩/연결 안내 배너
  let banner = null;
  if (loading) {
    banner = <StatusBanner type="loading" message="서버 연결 중..." />;
  } else if (socketError) {
    banner = <StatusBanner type="error" message={socketError} />;
  } else if (!isConnected) {
    banner = <StatusBanner type="warning" message="서버와 연결이 끊어졌습니다." />;
  }

  return (
    <div className={styles.realTimeContainer}>
      {banner}
      <div className={`${styles.realTimeBanner} status-banner loading`}>
        REAL TIME : {realTimeClock ? realTimeClock.timestamp : '데이터 없음'}
      </div>
    </div>
  );
}

export default RealTime;
