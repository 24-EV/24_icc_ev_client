import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import { CHART_COLORS } from '../../constants/colors';
import useDarkMode from '../../hooks/useDarkMode';
import useHistory from '../../hooks/useHistory';
import PanelHeader from './PanelHeader';
import ChartLegend from './ChartLegend';
import cardPanelStyles from '../../styles/common/CardPanel.module.css';
import styles from '../../styles/chart/Chart.module.css';

function Chart({ dataKey = '', title = '', side = '' }) {
  const chartRef = useRef();
  const chartInstance = useRef();
  const seriesRefs = useRef([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isDark] = useDarkMode();
  const { history } = useHistory();

  // ---------- 데이터 가공 ----------
  const groupData = useMemo(() => {
    if (!Array.isArray(history)) return [];
    return history
      .map((h) => {
        if (!h[dataKey]) return null;
        const group = {};
        Object.entries(h[dataKey]).forEach(([k, v]) => {
          if (v?.value && typeof v.value === 'object' && (side === 'L' || side === 'R')) {
            group[k] = v.value[side];
          } else {
            group[k] = v?.value ?? null;
          }
        });
        return { timestamp: h.timestamp, ...group };
      })
      .filter(Boolean);
  }, [history, dataKey, side]);

  // 키 목록
  const dataKeys = useMemo(() => {
    if (!groupData.length) return [];
    return Object.keys(groupData[0])
      .filter((k) => k !== 'timestamp')
      .sort();
  }, [groupData]);

  // ---------- 선택 상태 ----------
  const [selected, setSelected] = useState([]);
  const initialized = useRef(false);

  // ✅ 최초 도착했을 때만 전체 ON
  useEffect(() => {
    if (!initialized.current && dataKeys.length) {
      setSelected(dataKeys);
      initialized.current = true;
    }
  }, [dataKeys]);

  // ✅ 이후 dataKeys가 변해도, 사용자가 꺼둔 건 건드리지 말고
  //    "새로 생긴 키"만 ON으로 합쳐주기
  useEffect(() => {
    if (!initialized.current) return;
    setSelected((prev) => {
      if (!prev.length) return dataKeys; // 비정상 초기화 보호
      const newOnes = dataKeys.filter((k) => !prev.includes(k));
      return newOnes.length ? [...prev, ...newOnes] : prev;
    });
  }, [dataKeys]);

  const MAX_POINTS = 500;
  const slicedData = useMemo(() => groupData.slice(-MAX_POINTS), [groupData]);

  const toEpochSeconds = (str, idx) => {
    if (!str) return idx;
    const d = new Date(str.replace(' ', 'T'));
    return Math.floor(d.getTime() / 1000);
  };

  // ---------- 차트 1회 생성 ----------
  useEffect(() => {
    if (!chartRef.current || chartInstance.current) return;

    const chartTextColor = isDark ? '#f3f0ff' : '#181825';
    const chartGridColor = isDark ? '#393552' : '#bdbdbd';

    chartInstance.current = createChart(chartRef.current, {
      autoSize: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- 테마 변경 시 색상만 갱신 ----------
  useEffect(() => {
    if (!chartInstance.current) return;
    const chartTextColor = isDark ? '#f3f0ff' : '#181825';
    const chartGridColor = isDark ? '#393552' : '#bdbdbd';
    chartInstance.current.applyOptions({
      layout: { background: { color: 'transparent' }, textColor: chartTextColor },
      grid: {
        vertLines: { visible: false, color: chartGridColor },
        horzLines: { visible: false, color: chartGridColor }
      },
      leftPriceScale: { textColor: chartTextColor, borderColor: '#71649C' },
      timeScale: { borderColor: '#71649C' }
    });
  }, [isDark]);

  // ---------- dataKeys/side 변경 시에만 시리즈 재구성 (selected에 의존하지 않음) ----------
  useEffect(() => {
    if (!chartInstance.current) return;

    // 기존 제거
    seriesRefs.current.forEach((s) => s && chartInstance.current.removeSeries(s));
    seriesRefs.current = [];

    // 새로 추가
    seriesRefs.current = dataKeys.map((key, idx) =>
      chartInstance.current.addLineSeries({
        priceScaleId: 'left',
        color: CHART_COLORS[idx % CHART_COLORS.length],
        lineWidth: 2,
        title: key + (side ? ` (${side})` : '')
      })
    );
  }, [dataKeys, side]);

  // ---------- 데이터 업데이트 ----------
  useEffect(() => {
    if (!chartInstance.current || !slicedData.length) return;

    dataKeys.forEach((key, idx) => {
      const series = seriesRefs.current[idx];
      if (!series) return;

      const seen = new Set();
      const seriesData = slicedData
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

    if (autoScroll) chartInstance.current.timeScale().scrollToRealTime();
  }, [slicedData, dataKeys, autoScroll, side]);

  // ---------- 선택 상태 → 시리즈 가시성 반영 ----------
  useEffect(() => {
    if (!chartInstance.current || !seriesRefs.current.length) return;
    dataKeys.forEach((key, idx) => {
      const s = seriesRefs.current[idx];
      if (!s) return;
      const visible = selected.includes(key);
      if (typeof s.setVisible === 'function') s.setVisible(visible);
      else s.applyOptions({ visible });
    });
  }, [selected, dataKeys]);

  const toggleScroll = () => {
    setAutoScroll((prev) => {
      if (!prev) chartInstance.current?.timeScale().scrollToRealTime();
      return !prev;
    });
  };

  return (
    <div className={cardPanelStyles.cardPanel}>
      <PanelHeader
        title={title}
        toggleChecked={autoScroll}
        onToggleChange={toggleScroll}
        toggleSwitchLabel="스크롤 잠금"
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div ref={chartRef} className={styles.chartArea} />
        <ChartLegend
          dataKeys={dataKeys}
          selected={selected}
          onToggle={(key) =>
            setSelected((prev) =>
              prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
            )
          }
        />
      </div>
    </div>
  );
}

export default Chart;
