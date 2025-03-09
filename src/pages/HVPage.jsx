// import React, { useContext } from 'react';
// import { SocketContext } from '../context/SocketContext';
// import hvStyles from '../styles/HVPageStyle'; // HV 전용 스타일 불러오기

// function HVPage() {
//   const { hvData } = useContext(SocketContext);

//   if (!hvData) {
//     return <div style={hvStyles.noData}>데이터가 없습니다.</div>;
//   }

//   return (
    // <div style={hvStyles.container}>
    //   <h1 style={hvStyles.title}>HV</h1>

    //   <div style={hvStyles.dataContainer}>
    //     <h3 style={hvStyles.label}>전압</h3>
    //     <h1 style={hvStyles.data}>{hvData.voltage} V</h1>
    //   </div>

    //   <div style={hvStyles.dataContainer}>
    //     <h3 style={hvStyles.label}>전류</h3>
    //     <h1 style={hvStyles.data}>{hvData.current} A</h1>
    //   </div>

    //   <div style={hvStyles.dataContainer}>
    //     <h3 style={hvStyles.label}>배터리 잔량</h3>
    //     <h1 style={hvStyles.data}>{hvData.battery_percent} %</h1>
    //   </div>
    // </div>
//   );
// }

// export default HVPage;

import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import hvStyles from '../styles/HVPageStyle';

function HVPage() {
  const { hvData } = useContext(SocketContext);

  if (!hvData) {
    return <div style={hvStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={hvStyles.container}>
      {/* 데이터 컨테이너를 한 줄로 배치 */}
      <div style={hvStyles.rowContainer}>
      <h2 style={{display: 'block'}}>HV</h2> 
        <div style={hvStyles.dataContainer}>
          <h3 style={hvStyles.label}>전압</h3>
          <h1 style={hvStyles.data}>{hvData.voltage} V</h1>
        </div>

        <div style={hvStyles.dataContainer}>
          <h3 style={hvStyles.label}>전류</h3>
          <h1 style={hvStyles.data}>{hvData.current} A</h1>
        </div>

        <div style={hvStyles.dataContainer}>
          <h3 style={hvStyles.label}>배터리 잔량</h3>
          <h1 style={hvStyles.data}>{hvData.battery_percent} %</h1>
        </div>
      </div>
      <div style={hvStyles.dataContainer}>
        <Chart
          data={hvData}
          dataKeys={['voltage', 'current', 'battery_percent']}
          colors={['purple', 'orange', 'cyan']}
        />
      </div>
    </div>
  );
}

export default HVPage;
