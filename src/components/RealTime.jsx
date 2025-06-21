import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import StatusBanner from './common/StatusBanner';

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
    <>
      {banner}
      <div
        style={{
          position: 'fixed',
          bottom: 80,
          right: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          paddingRight: 24,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            background: '#fff',
            fontSize: 12,
            color: '#666',
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            padding: '6px 16px',
            fontFamily: 'monospace',
            letterSpacing: '-0.5px',
          }}
        >
          REAL TIME : {realTimeClock ? realTimeClock.timestamp : '데이터 없음'}
        </span>
      </div>
    </>
  );
}

export default RealTime;
