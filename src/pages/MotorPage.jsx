import React, { useState, useEffect, useContext } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SocketContext } from '../context/SocketContext';
import motorStyles from '../styles/MotorPageStyle'; // Motor 전용 스타일 불러오기

function MotorPage() {
  const { motorData } = useContext(SocketContext);
  const [chartData, setChartData] = useState([]);
  const maxDataPoints = 30; // 30초간의 데이터를 유지
  const localeTimeStringOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }

  useEffect(() => {
      const initialData = Array.from({ length: maxDataPoints }, (_, index) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() - (maxDataPoints - index - 1));
        return {
          name: time.toLocaleTimeString('ko-KR', localeTimeStringOptions),
          throttle: 0,
          rpm: 0,
          controller_temperature: 0,
        };
      });
      setChartData(initialData);
    }, []);

  // Queue-like update logic for motor data
  useEffect(() => {
    const interval = setInterval(() => {
      if (motorData) {
        const newData = {
          name: new Date().toLocaleTimeString('ko-KR', localeTimeStringOptions), // 현재 시간 표시
          throttle: motorData.throttle,
          rpm: motorData.rpm,
          controller_temperature: motorData.controller_temperature,
        };

        setChartData((prevData) => {
          const updatedData = [...prevData, newData];
          // 데이터가 30개를 초과하면 앞의 데이터를 제거 (Queue처럼 작동)
          if (updatedData.length > maxDataPoints) {
            updatedData.shift();
          }
          return updatedData;
        });
      }
    }, 1000); // 1초마다 데이터를 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
  }, [motorData]);

  const color = ['cornflowerblue', 'green', 'tomato'];

  const dataKeyArr = ['throttle', 'rpm', 'controller_temperature'];

  if (!motorData) {
    return <div style={motorStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={motorStyles.container}>
      <h1 style={motorStyles.title}>Motor</h1>

      <div style={motorStyles.dataContainer}>
        <h3 style={motorStyles.label}>Throttle</h3>
        <h1 style={motorStyles.data}>{motorData.throttle} / 255</h1>
      </div>

      <div style={motorStyles.dataContainer}>
        <h3 style={motorStyles.label}>RPM</h3>
        <h1 style={motorStyles.data}>{motorData.rpm} RPM</h1>
      </div>

      <div style={motorStyles.dataContainer}>
        <h3 style={motorStyles.label}>컨트롤러 온도</h3>
        <h1 style={motorStyles.data}>{motorData.controller_temperature} ℃</h1>
      </div>

      <div style={motorStyles.chartContainer}> {/* 차트를 배치할 컨테이너 */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {
              dataKeyArr.map((each, index) => (
                <Line
                  key={each}
                  type="monotone"
                  dataKey={each}
                  stroke={color[index % color.length]}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))
            }
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

export default MotorPage;
