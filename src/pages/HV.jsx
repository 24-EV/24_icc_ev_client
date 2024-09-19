import React, { useContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { SocketContext } from '../context/SocketContext';

function HV() {
  const {hvData} = useContext(SocketContext);  

  if (!hvData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1>HV</h1>
      <div className='voltage-container'>
        <h3>전압</h3>
        <h1>{hvData.voltage} V</h1>
      </div>
      <div className='current-container'>
        <h3>전류</h3>
        <h1>{hvData.current} A</h1>
      </div>
      <div className='battery_temperature-container'>
        <h3>배터리 온도</h3>
        <h1>{hvData.battery_temperature} ℃</h1>
      </div>
    </div>
  );
}

export default HV;