import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style';  // 공통 스타일 가져오기
import RealTime from '../components/RealTime';

function TestPage() {
  const { vehicleData } = useContext(SocketContext);
  const { hvData } = useContext(SocketContext);
  const { motorData } = useContext(SocketContext);
  const { realTimeClock } = useContext(SocketContext);

  if (!motorData) {
    return <div style={commonStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div >
      <div>
        <h1>속력 : {vehicleData.velocity} km/h</h1>
      </div>

      <div>
        <h1>RTC Module : {realTimeClock.timestamp}</h1>
      </div>

      <div>
        <h1>전압 : {hvData.voltage} V</h1>
      </div>

      <div>
        <h1>전류 : {hvData.current} A</h1>
      </div>

      <div>
        <h1>배터리 잔량 : {hvData.battery_percent} %</h1>
      </div>

      <div>
        <h1>Throttle : {motorData.throttle} / 255</h1>
      </div>

      <div>
        <h1>RPM : {motorData.rpm} RPM</h1>
      </div>

      <div>
        <h1>컨트롤러 온도 : {motorData.controller_temperature} ℃</h1>
      </div>
    </div>
  );
}

export default TestPage;
