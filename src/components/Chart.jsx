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

// 커스텀 툴팁 컴포넌트
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  // label(시간)이 비어있으면 시간 줄을 렌더링하지 않음
  return (
    <div
      style={{
        background: '#fff',
        padding: '12px 16px',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        color: '#3a2d71',
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
      {label && label.trim() && (
        <div style={{ opacity: 0.5, fontWeight: 400, fontSize: 13, marginBottom: 2 }}>{label}</div>
      )}
      {payload.map((entry, i) => (
        <div key={entry.dataKey} style={{ color: entry.stroke, fontWeight: 500 }}>
          {entry.name || entry.dataKey} : {entry.value}
        </div>
      ))}
    </div>
  );
}

function Chart({ data, dataKeys, colors, title }) {
  const maxDataPoints = 30; // 한 화면에 보여줄 데이터 개수
  // 전체 데이터 저장
  const [allData, setAllData] = useState([]);
  // 현재 윈도우 시작 인덱스
  const [windowStart, setWindowStart] = useState(0);
  const prevTimestampRef = useRef(null);

  // legend 상태 관리
  const [selected, setSelected] = useState(dataKeys);
  // ripple 효과 상태
  const [ripple, setRipple] = useState({});

  // 새 데이터가 들어오면 전체 데이터에 추가
  useEffect(() => {
    if (!data || !data.timestamp) return;
    if (prevTimestampRef.current === data.timestamp) return;
    prevTimestampRef.current = data.timestamp;

    const newData = {
      name: data.timestamp.slice(11, 19),
      ...data,
    };
    setAllData((prev) => {
      const updated = [...prev, newData];
      // 너무 오래된 데이터는 메모리 절약을 위해 1000개까지만 유지
      return updated.length > 1000 ? updated.slice(-1000) : updated;
    });
    // 새 데이터가 들어오면 윈도우를 최신으로 이동
    setWindowStart((prev, _, arr = allData) => {
      const newLen = arr.length + 1;
      return newLen > maxDataPoints ? newLen - maxDataPoints : 0;
    });
  }, [data, dataKeys]);

  // dataKeys가 바뀌면 legend 상태도 동기화
  useEffect(() => {
    setSelected(dataKeys);
  }, [dataKeys.join(',')]);

  // 현재 윈도우의 데이터만 보여줌
  const chartData =
    allData.length < maxDataPoints
      ? Array.from({ length: maxDataPoints - allData.length }, () => ({
          name: '',
          ...Object.fromEntries(dataKeys.map((k) => [k, 0])),
        })).concat(allData)
      : allData.slice(windowStart, windowStart + maxDataPoints);

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

  // 윈도우 이동 핸들러
  const canPrev = windowStart > 0;
  const canNext = allData.length > windowStart + maxDataPoints;
  const handlePrev = () => {
    if (canPrev) setWindowStart((prev) => Math.max(0, prev - 1));
  };
  const handleNext = () => {
    if (canNext) setWindowStart((prev) => Math.min(allData.length - maxDataPoints, prev + 1));
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
            {hasRealData && <CartesianGrid stroke="#ccc" vertical={false} horizontal={false} />}
            <YAxis />
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* 윈도우 이동 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          margin: '8px 0 0 0',
        }}
      >
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          style={{
            fontSize: 18,
            padding: '2px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--color-bg)',
            color: 'var(--color-primary)',
            opacity: canPrev ? 1 : 0.4,
            cursor: canPrev ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s',
          }}
        >
          ◀️
        </button>
        <span style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: 15 }}>
          {allData.length > maxDataPoints
            ? `${windowStart + 1}~${Math.min(windowStart + maxDataPoints, allData.length)} / ${allData.length}`
            : ''}
        </span>
        <button
          onClick={handleNext}
          disabled={!canNext}
          style={{
            fontSize: 18,
            padding: '2px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--color-bg)',
            color: 'var(--color-primary)',
            opacity: canNext ? 1 : 0.4,
            cursor: canNext ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s',
          }}
        >
          ▶️
        </button>
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
