// import React, { useState, useEffect, useContext } from 'react';
// import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { SocketContext } from '../context/SocketContext';
// import vehicleStyles from '../styles/VehiclePageStyle'; // Vehicle 전용 스타일 불러오기

// function VehiclePage() {
//   const { vehicleData } = useContext(SocketContext);
//   const { rtc_module } = useContext(SocketContext);
//   const [chartData, setChartData] = useState([]);
//   const maxDataPoints = 30; // 30초간의 데이터를 유지
//   const localeTimeStringOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }

//   // 초기 데이터 설정 (30개의 데이터 포인트를 0으로 채움)
//   useEffect(() => {
//     const initialData = Array.from({ length: maxDataPoints }, (_, index) => {
//       const time = new Date();
//       time.setSeconds(time.getSeconds() - (maxDataPoints - index - 1));
//       return {
//         name: time.toLocaleTimeString('ko-KR', localeTimeStringOptions),
//         speed: 0,
//       };
//     });
//     setChartData(initialData);
//   }, []);

//   // Queue-like update logic for vehicle data
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (vehicleData) {
//         const newData = {
//           name: new Date().toLocaleTimeString('ko-KR', localeTimeStringOptions), // 현재 시간 표시
//           speed: vehicleData.velocity,
//         };

//         setChartData((prevData) => {
//           const updatedData = [...prevData.slice(1), newData]; // 가장 오래된 데이터를 제거하고 새로운 데이터를 추가
//           return updatedData;
//         });
//       }
//     }, 1000); // 1초마다 데이터를 업데이트

//     return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
//   }, [vehicleData]);

//   const color = ['cornflowerblue'];
//   const dataKeyArr = ['speed'];

//   if (!vehicleData) {
//     return <div style={vehicleStyles.noData}>데이터가 없습니다.</div>;
//   }

//   return (
//     <div style={vehicleStyles.container}>
//       <div style={vehicleStyles.dataContainer}>
//         <h3>속력</h3>
//         <h1 style={vehicleStyles.data}>{vehicleData.velocity} km/h</h1>
//       </div>

//       <div style={vehicleStyles.chartContainer}> {/* 차트 컨테이너 */}
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             {dataKeyArr.map((each, index) => (
//               <Line
//                 key={each}
//                 type="monotone"
//                 dataKey={each}
//                 stroke={color[index % color.length]}
//                 strokeWidth={2}
//                 dot={false}
//                 isAnimationActive={false}
//               />
//             ))}
//             <CartesianGrid stroke="#ccc" />
//             <YAxis />
//             <XAxis dataKey="name" />
//             <Tooltip />
//             <Legend />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div style={vehicleStyles.dataContainer}>
//         <h3>RTC Module</h3>
//         <h1 style={vehicleStyles.data}>{rtc_module.timestamp}</h1>
//       </div>
//     </div>
//   );
// }

// export default VehiclePage;

import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Chart from "../components/Chart";
import vehicleStyles from "../styles/VehiclePageStyle";

function VehiclePage() {
  const { vehicleData } = useContext(SocketContext);
  const { realTimeClock } = useContext(SocketContext);

  if (!vehicleData) {
    return <div style={vehicleStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={vehicleStyles.container}>
      <div style={vehicleStyles.dataContainer}>
        <h3>속력</h3>
        <h1 style={vehicleStyles.data}>{vehicleData.velocity} km/h</h1>
      </div>
      <div style={vehicleStyles.dataContainer}>
        <Chart
          data={vehicleData}
          dataKeys={["velocity"]}
          colors={["cornflowerblue"]}
        />
      </div>
      <div style={vehicleStyles.dataContainer}>
        <h3>RTC Module</h3>
        <h1 style={vehicleStyles.data}>{realTimeClock.timestamp}</h1>
      </div>
    </div>
  );
}

export default VehiclePage;
