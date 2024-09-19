import React, { useContext } from 'react';

import RechartsExample from '../components/Chart';
import Loading from '../components/Loading';
import { Background } from '../components/Styles';
import { SocketContext } from '../context/SocketContext'; // 올바른 import 문

function Vehicle() {
  // useContext로부터 값을 객체로 구조화
  const { vehicleData } = useContext(SocketContext);

  if (!vehicleData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="vehicle-container">
      <h1>Vehicle</h1>
      <div className="velocity-container">
        <h3>속력</h3>
        <h1>{vehicleData.velocity} km/h</h1>
        <div>그래프 들어갈 자리</div>
      </div>
      <div className="rtc-module-container">
        <h3>RTC Module</h3>
        <h1>{vehicleData.rtc_module}</h1>
      </div>
    </div>
  );
}

export default Vehicle;
