import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style'; // 공통 스타일 불러오기

function Vehicle() {
  const { vehicleData } = useContext(SocketContext);

  if (!vehicleData) {
    return <div style={commonStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={commonStyles.container}>
      <h1 style={commonStyles.title}>Vehicle</h1>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>속력</h3>
        <h1 style={commonStyles.data}>{vehicleData.velocity} km/h</h1>
        <div>그래프 들어갈 자리</div>
      </div>

      <div style={commonStyles.dataContainer}>
        <h3 style={commonStyles.label}>RTC Module</h3>
        <h1 style={commonStyles.data}>{vehicleData.rtc_module}</h1>
      </div>
    </div>
  );
}

export default Vehicle;
