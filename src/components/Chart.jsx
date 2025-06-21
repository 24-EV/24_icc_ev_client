// import React, { useState, useEffect, useContext } from 'react';
// import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { SocketContext } from '../context/SocketContext';

// function Chart(props) {
//   const { vehicleData, hvData } = useContext(SocketContext);
//   const [chartData, setChartData] = useState([]);
//   const maxDataPoints = 30; // 30초간의 데이터를 유지

//   // Queue-like update logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (vehicleData && hvData) {
//         const newData = {
//           name: new Date().toLocaleTimeString(), // 현재 시간 표시
//           voltage: hvData.voltage,
//           current: hvData.current,
//           battery_percent: hvData.battery_percent,
//           speed: vehicleData.velocity,
//         };

//         setChartData((prevData) => {
//           const updatedData = [...prevData, newData];
//           // 데이터가 30개를 초과하면 앞의 데이터를 제거 (Queue처럼 작동)
//           if (updatedData.length > maxDataPoints) {
//             updatedData.shift();
//           }
//           return updatedData;
//         });
//       }
//     }, 1000); // 1초마다 데이터를 업데이트

//     return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
//   }, [vehicleData, hvData]);

//   const color = ['cornflowerblue', 'green', 'tomato', 'blueviolet', 'olive', 'darkslateblue'];

//   const dataKeyArr = ['voltage', 'current', 'battery_percent', 'speed'];

//   return (
//     <div>
//       <h1>{props.chartName}</h1>
//       <LineChart width={1000} height={500} data={chartData}>
//         {
//           dataKeyArr.map((each, index) => (
//             <Line
//               key={each}
//               type="monotone"
//               dataKey={each}
//               stroke={color[index % color.length]}
//               strokeWidth={4}
//               dot={false}
//             />
//           ))
//         }
//         <CartesianGrid stroke="#ccc" />
//         <YAxis />
//         <XAxis dataKey="name" />
//         <Tooltip />
//         <Legend />
//       </LineChart>
//     </div>
//   );
// }

// export default Chart;

import React, { useEffect, useRef, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Chart({ data, dataKeys, colors, title }) {
  const maxDataPoints = 30; // 30초치 데이터 유지
  // 초기 chartData를 0으로 30개 패딩
  const [chartData, setChartData] = useState(() =>
    Array.from({ length: maxDataPoints }, () => ({
      name: '',
      ...Object.fromEntries(dataKeys.map((k) => [k, 0])),
    })),
  );
  const prevTimestampRef = useRef(null);

  useEffect(() => {
    if (!data || !data.timestamp) return;
    if (prevTimestampRef.current === data.timestamp) return;
    prevTimestampRef.current = data.timestamp;

    const newData = {
      name: data.timestamp.slice(11, 19),
      ...data,
    };
    setChartData((prev) => {
      const updated = [...prev, newData];
      return updated.length > maxDataPoints ? updated.slice(-maxDataPoints) : updated;
    });
  }, [data, dataKeys]);

  if (!chartData || chartData.length === 0) {
    return <div style={{ textAlign: 'center', color: 'gray' }}>차트 데이터가 없습니다.</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h2>
      <div
        style={{
          width: '100%',
          height: '350px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
            <CartesianGrid stroke="#ccc" />
            <YAxis />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default React.memo(Chart);
