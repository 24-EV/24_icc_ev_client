import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import StatusBanner from './common/StatusBanner';
import styles from '../styles/RealTime.module.css';
import useHistory from '../hooks/useHistory';

function RealTime() {
  // useSocketData 직접 호출 X, Context만 사용
  const ctx = useContext(SocketContext);
  console.log('SocketContext 값:', ctx);
  const {
    vehicleData,
    hvData,
    motorData,
    gpsData,
    realTimeClock,
    socketError,
    loading,
    isConnected,
  } = ctx;
  const { addHistory } = useHistory();

  useEffect(() => {
    console.log('vehicleData:', vehicleData);
    if (vehicleData && vehicleData.timestamp) {
      console.log('addHistory 호출!', { vehicleData, hvData, motorData, gpsData, realTimeClock });
      addHistory({ vehicleData, hvData, motorData, gpsData, realTimeClock });
    }
  }, [vehicleData, hvData, motorData, gpsData, realTimeClock, addHistory]);

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
      <div className={`${styles.realTimeBanner} ${styles.loading}`}>
        REAL TIME : {realTimeClock ? realTimeClock.timestamp : '데이터 없음'}
      </div>
    </div>
  );
}

export default RealTime;
