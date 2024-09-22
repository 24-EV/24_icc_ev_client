import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style'; // 공통 스타일 불러오기

function HV() {
  const { hvData } = useContext(SocketContext);

  if (!hvData) {
    return <div style={commonStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={commonStyles.container}>
      <h1 style={commonStyles.title}>HV</h1>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>전압</h3>
        <h1 style={commonStyles.data}>{hvData.voltage} V</h1>
      </div>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>전류</h3>
        <h1 style={commonStyles.data}>{hvData.current} A</h1>
      </div>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>배터리 온도</h3>
        <h1 style={commonStyles.data}>{hvData.battery_temperature} ℃</h1>
      </div>
    </div>
  );
}

export default HV;
