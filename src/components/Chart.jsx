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


import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({ data, dataKeys, colors, title }) {
  const [chartData, setChartData] = useState([]);

  const [selectedKeys, setSelectedKeys] = useState(dataKeys);
  const [isZoomed, setIsZoomed] = useState(false);

  const maxDataPoints = 30;

  function getKoreaTime() {
    const koreaTime = new Date(Date.now() + (9 * 60 * 60 * 1000)); // UTC + 9시간
    return koreaTime.toISOString().replace('T', ' ').split('.')[0];
  }

  useEffect(() => {
    // 기준 시간: 현재 시간을 설정 (제일 마지막 배열의 시간)
    const baseTime = new Date();

    const initialData = Array.from({ length: maxDataPoints }, (_, index) => {
        // 기준 시간에서 1초씩 감소
        const time = new Date(baseTime.getTime());
        time.setSeconds(time.getSeconds() - (maxDataPoints - index - 1));

        // Date.now()를 강제로 해당 시간으로 변경하여 getKoreaTime()을 호출
        const originalNow = Date.now;
        global.Date.now = () => time.getTime();
        const formattedTime = getKoreaTime();
        global.Date.now = originalNow; // Date.now() 원래대로 복구

        return {
            name: formattedTime,
            throttle: 0,
            rpm: 0,
            controller_temperature: 0,
        };
    });

    setChartData(initialData);
}, []);

  useEffect(() => {
    if (!data || !data.timestamp) return; // 데이터가 없거나 timestamp가 없으면 리턴
  
    const newData = {
      name: data.timestamp,  // X축을 DB의 timestamp 값으로 설정
      ...data
    };
  
    setChartData((prevData) => {
      const updatedData = [...prevData, newData];
      return updatedData.length > 30 ? updatedData.slice(1) : updatedData;
    });
  }, [data]);
  
  

  const handleKeyToggle = (key) => {
    setSelectedKeys(prevKeys => prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h2>
      {/* 차트 컨테이너 */}
      <div style={{ width: '100%', height: '350px', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {selectedKeys.map((key, index) => (
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
      
      {/* 데이터 선택 체크박스 */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        {dataKeys.map(key => (
          <label key={key} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedKeys.includes(key)}
              onChange={() => handleKeyToggle(key)}
            />
            {key}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Chart;
