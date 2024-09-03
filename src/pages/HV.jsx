import React, { useEffect, useState } from 'react';

import Loading from '../components/Loading';

function HV({data}) {
  if (!data) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <h1>HV</h1>
      <div className='voltage-container'>
        <h3>전압</h3>
        <h1>{data.voltage} V</h1>
      </div>
      <div className='current-container'>
        <h3>전류</h3>
        <h1>{data.current} A</h1>
      </div>
      <div className='battery_temperature-container'>
        <h3>배터리 온도</h3>
        <h1>{data.battery_temperature} ℃</h1>
      </div>
    </div>
  );
}

export default HV;