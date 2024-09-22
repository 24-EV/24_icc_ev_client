import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style';  // 공통 스타일 가져오기

function Motor() {
  const { motorData } = useContext(SocketContext);

  if (!motorData) {
    return <div style={commonStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={commonStyles.container}>
      <h1 style={commonStyles.title}>Motor</h1>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>Throttle</h3>
        <h1 style={commonStyles.data}>{motorData.throttle} / 255</h1>
      </div>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>RPM</h3>
        <h1 style={commonStyles.data}>{motorData.rpm} RPM</h1>
      </div>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>컨트롤러 온도</h3>
        <h1 style={commonStyles.data}>{motorData.controller_temperature} ℃</h1>
      </div>
    </div>
  );
}

export default Motor;
