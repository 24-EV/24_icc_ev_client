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
