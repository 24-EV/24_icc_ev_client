import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import legendStyles from '../styles/ChartLegendPanel.module.css';
import cardPanelStyles from '../styles/CardPanel.module.css';
import styles from '../styles/Chart.module.css';
import useDarkMode from '../hooks/useDarkMode';
import PanelHeader from '../components/PanelHeader';
import ChartLegend from '../components/ChartLegend';

// data: [{ name: '시간', key1: 값, key2: 값, ... }]
// dataKeys: ['key1', 'key2', ...]
// colors: ['#color1', '#color2', ...]
// title: 차트 제목
function Chart({
  data = [],
  dataKeys = [],
  colors = [],
  title = '',
  loading,
  error,
  yAxisMin,
  yAxisMax,
  yAxisTickInterval
}) {
  const chartRef = useRef();
  const chartInstance = useRef();
  const seriesRefs = useRef([]);
  const [autoScroll, setAutoScroll] = useState(true);
  // legend 상태 관리
  const [selected, setSelected] = useState(dataKeys);
  const [chartReady, setChartReady] = useState(false);
  const [isDark] = useDarkMode();

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

  // 1-1, 1-2: useMemo로 데이터 정렬 및 최근 500개만 슬라이싱
  const MAX_POINTS = 500;
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
      const ta = a.timestamp ? toEpochSeconds(a.timestamp) : 0;
      const tb = b.timestamp ? toEpochSeconds(b.timestamp) : 0;
      return ta - tb;
    });
  }, [data]);
  const slicedData = useMemo(() => {
    if (!sortedData.length) return [];
    return sortedData.slice(-MAX_POINTS);
  }, [sortedData]);

  // chartReady: 데이터가 1개 이상 있으면 바로 true
  useEffect(() => {
    setChartReady(Array.isArray(data) && data.length > 0);
  }, [data]);

  // 차트 생성/옵션 (isDark는 deps에서 제거)
  useEffect(() => {
    if (!chartReady) return;
    if (!chartRef.current) return;
    // 안전하게 차트 인스턴스 제거
    if (chartInstance.current) {
      try {
        chartInstance.current.remove();
      } catch (e) {
        // 이미 dispose된 경우 무시
        // console.warn('Chart already disposed:', e);
      }
      chartInstance.current = null;
    }
    chartRef.current.innerHTML = '';
    const chartTextColor = isDark ? '#f3f0ff' : '#181825';
    const chartGridColor = isDark ? '#393552' : '#bdbdbd';
    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 340,
      layout: {
        background: { color: 'transparent' },
        textColor: chartTextColor,
        fontFamily: 'Inter, Pretendard, Arial, sans-serif'
      },
      grid: {
        vertLines: { visible: false, color: chartGridColor },
        horzLines: { visible: false, color: chartGridColor }
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: true,
        borderColor: '#71649C',
        tickMarkFormatter: (v) => Math.round(v).toString(),
        scaleMargins: { top: 0.1, bottom: 0.1 },
        textColor: chartTextColor
      },
      rightPriceScale: {
        visible: false
      },
      timeScale: {
        borderColor: '#71649C',
        timeVisible: true,
        secondsVisible: true,
        textColor: chartTextColor
      }
    });
    // 시리즈 추가 (왼쪽 Y축에)
    seriesRefs.current = dataKeys.map((key, idx) => {
      return chartInstance.current.addLineSeries({
        priceScaleId: 'left',
        color: colors[idx % colors.length] || '#a259ec',
        lineWidth: 2,
        title: key,
        visible: selected.includes(key)
      });
    });
    // *** 차트가 생성된 직후, 현재 slicedData로 setData ***
    if (Array.isArray(slicedData) && slicedData.length > 0) {
      dataKeys.forEach((key, idx) => {
        const series = seriesRefs.current[idx];
        if (!series) return;
        const seen = new Set();
        const seriesData = slicedData
          .map((d, i) => ({
            time: d.timestamp ? toEpochSeconds(d.timestamp) : i,
            value: typeof d[key] === 'number' && !isNaN(d[key]) ? d[key] : 0
          }))
          .filter((item) => {
            if (seen.has(item.time)) return false;
            seen.add(item.time);
            return true;
          });
        series.setData(seriesData);
      });
    }
    return () => {
      if (chartInstance.current) {
        try {
          chartInstance.current.remove();
        } catch (e) {
          // 이미 dispose된 경우 무시
        }
        chartInstance.current = null;
      }
    };
  }, [chartReady]);

  // 다크/라이트모드 변경 시 차트 옵션만 동적으로 변경
  useEffect(() => {
    if (!chartInstance.current) return;
    const chartTextColor = isDark ? '#f3f0ff' : '#181825';
    const chartGridColor = isDark ? '#393552' : '#bdbdbd';
    chartInstance.current.applyOptions({
      layout: {
        background: { color: 'transparent' },
        textColor: chartTextColor,
        fontFamily: 'Inter, Pretendard, Arial, sans-serif'
      },
      grid: {
        vertLines: { visible: false, color: chartGridColor },
        horzLines: { visible: false, color: chartGridColor }
      },
      leftPriceScale: { textColor: chartTextColor },
      timeScale: { textColor: chartTextColor }
    });
  }, [isDark]);

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
    if (!chartInstance.current || !slicedData) return;
    const arr = Array.isArray(slicedData) ? slicedData : [];
    if (arr.length === 0) return;
    dataKeys.forEach((key, idx) => {
      const series = seriesRefs.current[idx];
      if (!series) return;
      const seen = new Set();
      const seriesData = arr
        .map((d, i) => ({
          time: d.timestamp ? toEpochSeconds(d.timestamp) : i,
          value: typeof d[key] === 'number' && !isNaN(d[key]) ? d[key] : 0
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
  }, [slicedData, dataKeys, autoScroll]);

  // ResizeObserver로 차트 컨테이너 크기 변화 감지 및 리사이즈
  useEffect(() => {
    if (!chartRef.current || !chartInstance.current) return;
    const container = chartRef.current;
    const chart = chartInstance.current;
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        chart.resize(width, height);
      }
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [chartReady, isDark]);

  // 로딩/에러/데이터 없음 처리 (예시)
  if (typeof loading !== 'undefined' && loading)
    return (
      <div className={styles.chartArea}>
        <span>로딩 중...</span>
      </div>
    );
  if (typeof error !== 'undefined' && error)
    return (
      <div className={styles.chartArea}>
        <span>에러 발생: {error.message}</span>
      </div>
    );
  if (!slicedData || slicedData.length === 0)
    return (
      <div className={styles.chartArea}>
        <span>데이터 없음</span>
      </div>
    );

  return (
    <div className={cardPanelStyles.cardPanel}>
      <PanelHeader
        title={title}
        toggleChecked={autoScroll}
        onToggleChange={() => setAutoScroll((v) => !v)}
        toggleSwitchLabel="스크롤 잠금"
      />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          ref={chartRef}
          className={styles.chartArea}
          style={{ flex: 1, background: 'transparent' }}
        />
        <ChartLegend
          dataKeys={dataKeys}
          selected={selected}
          onClick={handleLegendClick}
          onKeyDown={handleLegendKeyDown}
          colors={colors}
          legendStyles={legendStyles}
          style={{ paddingTop: 12 }}
        />
      </div>
    </div>
  );
}

export default Chart;
