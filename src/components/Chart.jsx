import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import legendStyles from '../styles/ChartLegendPanel.module.css';
import cardPanelStyles from '../styles/CardPanel.module.css';

// data: [{ name: '시간', key1: 값, key2: 값, ... }]
// dataKeys: ['key1', 'key2', ...]
// colors: ['#color1', '#color2', ...]
// title: 차트 제목
function Chart({ data = [], dataKeys = [], colors = [], title = '' }) {
  const chartRef = useRef();
  const chartInstance = useRef();
  const seriesRefs = useRef([]);
  const [autoScroll, setAutoScroll] = useState(true);
  // legend 상태 관리
  const [selected, setSelected] = useState(dataKeys);
  const [chartReady, setChartReady] = useState(false);

  // legend 토글 핸들러
  const handleLegendClick = (key) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };
  // 키보드 접근성(선택적)
  const handleLegendKeyDown = (key, e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    }
  };

  // 시간 문자열(YYYY-MM-DD HH:mm:ss 또는 HH:mm:ss) → epoch(초) 변환
  function toEpochSeconds(str) {
    if (!str) return 0;
    const d = new Date(str.replace(' ', 'T'));
    return Math.floor(d.getTime() / 1000);
  }

  // ResizeObserver로 차트 컨테이너 크기 감지
  useEffect(() => {
    if (!chartRef.current) return;
    let observer = new window.ResizeObserver(() => {
      if (!chartRef.current) return;
      if (chartRef.current.clientWidth > 0 && chartRef.current.clientHeight > 0) {
        setChartReady(true);
      }
    });
    observer.observe(chartRef.current);
    if (chartRef.current.clientWidth > 0 && chartRef.current.clientHeight > 0) {
      setChartReady(true);
    }
    return () => observer.disconnect();
  }, []);

  // 차트 생성/옵션
  useEffect(() => {
    if (!chartReady) return;
    if (!chartRef.current) return;
    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 340,
      layout: {
        background: { color: 'transparent' },
        textColor: '#fff',
      },
      grid: {
        vertLines: { visible: false, color: '#222' },
        horzLines: { visible: false, color: '#222' },
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: true,
        borderColor: '#71649C',
        tickMarkFormatter: (v) => Math.round(v).toString(),
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderColor: '#71649C',
        timeVisible: true,
        secondsVisible: true,
      },
    });
    // 시리즈 추가 (왼쪽 Y축에)
    seriesRefs.current = dataKeys.map((key, idx) => {
      return chartInstance.current.addLineSeries({
        priceScaleId: 'left',
        color: colors[idx % colors.length] || '#a259ec',
        lineWidth: 2,
        title: key,
        visible: selected.includes(key),
      });
    });
    return () => {
      chartInstance.current && chartInstance.current.remove();
    };
    // eslint-disable-next-line
  }, [chartReady]);

  // 시리즈 on/off(legend) 반영
  useEffect(() => {
    if (!seriesRefs.current.length) return;
    dataKeys.forEach((key, idx) => {
      const series = seriesRefs.current[idx];
      if (!series) return;
      series.applyOptions({ visible: selected.includes(key) });
    });
  }, [selected, dataKeys]);

  // 데이터 업데이트
  useEffect(() => {
    if (!chartInstance.current || !data) return;
    // data가 배열이 아니면 배열로 변환
    const arr = Array.isArray(data) ? data : data && typeof data === 'object' ? [data] : [];
    if (arr.length === 0) return;
    // time 오름차순 정렬(동일 time 중복 방지)
    const sortedData = [...arr].sort((a, b) => {
      const ta = a.timestamp ? toEpochSeconds(a.timestamp) : 0;
      const tb = b.timestamp ? toEpochSeconds(b.timestamp) : 0;
      return ta - tb;
    });
    dataKeys.forEach((key, idx) => {
      const series = seriesRefs.current[idx];
      if (!series) return;
      // time이 중복된 데이터는 첫 번째만 사용
      const seen = new Set();
      const seriesData = sortedData
        .map((d, i) => ({
          time: d.timestamp ? toEpochSeconds(d.timestamp) : i,
          value: typeof d[key] === 'number' && !isNaN(d[key]) ? d[key] : 0,
        }))
        .filter((item) => {
          if (seen.has(item.time)) return false;
          seen.add(item.time);
          return true;
        });
      series.setData(seriesData);
    });
    if (autoScroll) {
      chartInstance.current.timeScale().scrollToRealTime();
    }
  }, [data, dataKeys, autoScroll]);

  return (
    <div className={cardPanelStyles.cardPanel}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <h2 style={{ margin: 0 }}>
          {title}{' '}
          <span style={{ fontWeight: 400, fontSize: 15, opacity: 0.5 }}>(코인/주식 스타일)</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#a259ec', fontWeight: 500, fontSize: 15 }}>스크롤 잠금</span>
          {/* 커스텀 토글 스위치 */}
          <label style={{ position: 'relative', display: 'inline-block', width: 38, height: 22 }}>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: autoScroll ? '#a259ec' : '#444',
                transition: 'background 0.2s',
                borderRadius: 22,
                boxShadow: autoScroll ? '0 0 4px #a259ec55' : 'none',
              }}
            ></span>
            <span
              style={{
                position: 'absolute',
                left: autoScroll ? 18 : 2,
                top: 2,
                width: 18,
                height: 18,
                background: '#fff',
                borderRadius: '50%',
                transition: 'left 0.2s',
                boxShadow: '0 1px 4px #0002',
              }}
            ></span>
          </label>
        </div>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: 340, minWidth: 100, minHeight: 100 }} />
      {/* legend(그래프 선택 버튼) 아래로 이동 */}
      <div className={legendStyles.legendPanel}>
        {dataKeys.map((key, idx) => {
          const isActive = selected.includes(key);
          return (
            <button
              key={key}
              className={[
                legendStyles.legendItem,
                isActive ? legendStyles.legendItemActive : legendStyles.legendItemInactive,
              ].join(' ')}
              style={{
                color: isActive ? colors[idx % colors.length] || '#a259ec' : undefined,
              }}
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => handleLegendClick(key)}
              onKeyDown={(e) => handleLegendKeyDown(key, e)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Chart;
