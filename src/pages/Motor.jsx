import React, { useContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { SocketContext } from '../context/SocketContext';

function Motor() {
  const {motorData} = useContext(SocketContext);

  if (!motorData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='motor-container'>
      <h1>Motor</h1>
      <div className='throttle-container'>
        <h3>Throttle</h3>
        <h1>{motorData.throttle} / 255</h1>
      </div>
      <div className='rpm-container'>
        <h3>RPM</h3>
        <h1>{motorData.rpm} RPM</h1>
      </div>
      <div className='torque-container'>
        <h3>토크</h3>
        <h1>{motorData.torque} N·m</h1>
      </div>
      <div className='motor_temperature-container'>
        <h3>모터 온도</h3>
        <h1>{motorData.motor_temperature} ℃</h1>
      </div>
    </div>
  )
}

export default Motor;
