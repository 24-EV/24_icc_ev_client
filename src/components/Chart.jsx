import React, { useEffect, useRef, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import legendStyles from '../styles/ChartLegendPanel.module.css';

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

  // legend 상태 관리
  const [selected, setSelected] = useState(dataKeys);
  // ripple 효과 상태
  const [ripple, setRipple] = useState({});

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

  // dataKeys가 바뀌면 legend 상태도 동기화
  useEffect(() => {
    setSelected(dataKeys);
  }, [dataKeys.join(',')]);

  if (!chartData || chartData.length === 0) {
    return <div>차트 데이터가 없습니다.</div>;
  }

  // 실제 데이터가 있는지 확인
  const hasRealData = chartData.some((d) =>
    Object.values(d).some((v) => typeof v === 'number' && v !== 0),
  );

  const handleLegendClick = (key, e) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    // ripple 효과
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRipple({ key, x, y, size, ts: Date.now() });
  };

  const handleLegendKeyDown = (key, e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    }
  };

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 20,
        boxShadow: '0 2px 12px rgba(124,58,237,0.06)',
        padding: '1.2rem 1.2rem 0.7rem 1.2rem',
        margin: '1.2rem 0',
        width: '100%',
      }}
    >
      <h2 style={{ margin: '0 0 1.2rem 0' }}>{title}</h2>
      <div
        style={{
          width: '100%',
          height: '350px',
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
                hide={!selected.includes(key)}
              />
            ))}
            {hasRealData && <CartesianGrid stroke="#ccc" />}
            <YAxis />
            <XAxis dataKey="name" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={legendStyles.legendPanel}>
        {dataKeys.map((key, idx) => {
          const isActive = selected.includes(key);
          return (
            <span
              key={key}
              className={[
                legendStyles.legendItem,
                isActive ? legendStyles.legendItemActive : legendStyles.legendItemInactive,
              ].join(' ')}
              tabIndex={0}
              aria-pressed={isActive}
              role="button"
              aria-label={`${key} 데이터 토글`}
              onClick={(e) => handleLegendClick(key, e)}
              onKeyDown={(e) => handleLegendKeyDown(key, e)}
              style={{ position: 'relative', outline: 'none' }}
            >
              {key}
              {/* Ripple 효과 */}
              {ripple.key === key && Date.now() - ripple.ts < 400 && (
                <span
                  className="ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Chart);
