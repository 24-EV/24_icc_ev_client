import React, { useEffect, useState } from 'react';

import RechartsExample from '../components/Chart';
import Loading from '../components/Loading';
import { Background } from '../components/Styles';
// import { SocketContext } from '../context/SocketContext'; // 올바른 import 문

function Vehicle({ data }) {
  if (data) {
    return (
      <div>
          <Loading />
      </div>

    )
  }

  return (
    <div className="vehicle-container">
      <h1>Vehicle</h1>
      <div className="velocity-container">
        <h3>속력</h3>
        <h1>{data.velocity} km/h</h1>
        <div>그래프 들어갈 자리</div>
      </div>
      <div className="rtc-module-container">
        <h3>RTC Module</h3>
        <h1>{data.rtc_module}</h1>
      </div>
    </div>
  );
}

export default Vehicle;
