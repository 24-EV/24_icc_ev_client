import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import { CHART_COLORS } from '../../constants/colors';
import useDarkMode from '../../hooks/useDarkMode';
import useHistory from '../../hooks/useHistory';
import PanelHeader from './PanelHeader';
import ChartLegend from './ChartLegend';
import legendStyles from '../../styles/chart/ChartLegendPanel.module.css';
import cardPanelStyles from '../../styles/common/CardPanel.module.css';
import styles from '../../styles/chart/Chart.module.css';

function Chart({ dataKey = '', title = '' }) {
  const chartRef = useRef();
  const chartInstance = useRef();
  const seriesRefs = useRef([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isDark] = useDarkMode();

  const { history } = useHistory();

  // 그룹 데이터 변환
  const groupData = useMemo(() => {
    if (!Array.isArray(history)) return [];
    return history
      .map((h) => {
        if (!h[dataKey]) return null;
        return {
          timestamp: h.timestamp,
          ...Object.fromEntries(
            Object.entries(h[dataKey]).map(([k, v]) => [k, v.value])
          )
        };
      })
      .filter(Boolean);
  }, [history, dataKey]);

  // 데이터 키
  const dataKeys = useMemo(() => {
    if (!groupData.length) return [];
    return Object.keys(groupData[0]).filter((k) => k !== 'timestamp');
  }, [groupData]);

  const [selected, setSelected] = useState(dataKeys);
  useEffect(() => setSelected(dataKeys), [dataKeys]);

  const MAX_POINTS = 500;
  const slicedData = useMemo(() => groupData.slice(-MAX_POINTS), [groupData]);

  const toEpochSeconds = (str, idx) => {
    if (!str) return idx;
    const d = new Date(str.replace(' ', 'T'));
    return Math.floor(d.getTime() / 1000);
  };

  // 차트 최초 생성
  useEffect(() => {
    if (!chartRef.current || chartInstance.current) return;

    const chartTextColor = isDark ? '#f3f0ff' : '#181825';
    const chartGridColor = isDark ? '#393552' : '#bdbdbd';

    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 340,
      layout: { background: { color: 'transparent' }, textColor: chartTextColor },
      grid: {
        vertLines: { visible: false, color: chartGridColor },
        horzLines: { visible: false, color: chartGridColor }
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: true,
        borderColor: '#71649C',
        scaleMargins: { top: 0.1, bottom: 0.1 },
        textColor: chartTextColor
      },
      timeScale: { borderColor: '#71649C', timeVisible: true, secondsVisible: true }
    });

    // 시리즈 추가
    seriesRefs.current = dataKeys.map((key, idx) =>
      chartInstance.current.addLineSeries({
        priceScaleId: 'left',
        color: CHART_COLORS[idx % CHART_COLORS.length],
        lineWidth: 2,
        title: key,
        visible: selected.includes(key)
      })
    );

    // 리사이즈 대응
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        chartInstance.current.resize(width, height);
      }
    });
    resizeObserver.observe(chartRef.current);

    return () => resizeObserver.disconnect();
  }, [isDark, dataKeys, selected]);

  // 데이터 업데이트
  useEffect(() => {
    if (!chartInstance.current || !slicedData.length) return;

    dataKeys.forEach((key, idx) => {
      const series = seriesRefs.current[idx];
      if (!series) return;

      const seen = new Set();
      const seriesData = [...slicedData]
        .map((d, i) => ({
          time: toEpochSeconds(d.timestamp, i),
          value: typeof d[key] === 'number' && !isNaN(d[key]) ? d[key] : 0
        }))
        .filter((item) => {
          if (seen.has(item.time)) return false;
          seen.add(item.time);
          return true;
        })
        .sort((a, b) => a.time - b.time);

      series.setData(seriesData);
    });

    if (autoScroll) {
      chartInstance.current.timeScale().scrollToRealTime();
    } else {
      chartInstance.current.timeScale().fitContent();
    }
  }, [slicedData, dataKeys, autoScroll]);

  return (
    <div className={cardPanelStyles.cardPanel}>
      <PanelHeader
        title={title}
        toggleChecked={autoScroll}
        onToggleChange={() => setAutoScroll((v) => !v)}
        toggleSwitchLabel="스크롤 잠금"
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div ref={chartRef} className={styles.chartArea} style={{ flex: 1 }} />
        <ChartLegend
          dataKeys={dataKeys}
          selected={selected}
          onClick={(key) =>
            setSelected((prev) =>
              prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
            )
          }
          colors={dataKeys.map((_, idx) => CHART_COLORS[idx % CHART_COLORS.length])}
          legendStyles={legendStyles}
        />
      </div>
    </div>
  );
}

export default Chart;
