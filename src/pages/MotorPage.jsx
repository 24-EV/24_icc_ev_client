import React, { useContext, useRef, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/MotorPage.module.css';

const chartOptions = [
  { key: 'throttle', color: '#a259ec' },
  { key: 'rpm', color: '#b388ff' },
  { key: 'controller_temperature', color: '#7c3aed' },
];

function MotorPage() {
  const { motorData } = useContext(SocketContext);
  const [motorHistory, setMotorHistory] = useState([]);

  // motorData가 바뀔 때마다 누적 (최근 300개만 유지)
  useEffect(() => {
    if (motorData && motorData.timestamp) {
      setMotorHistory((prev) => [...prev, motorData].slice(-300));
    }
  }, [motorData]);

  if (!motorData) {
    return (
      <Section>
        <PageHeader title="모터" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <Section>
      <PageHeader title="모터" />
      <div className={styles.cardGrid}>
        <DataCard label="Throttle" value={motorData.throttle} unit="/ 255" />
        <DataCard label="RPM" value={motorData.rpm} unit="RPM" />
        <DataCard label="컨트롤러 온도" value={motorData.controller_temperature} unit="℃" />
      </div>
      <Chart
        data={motorData}
        dataKeys={chartOptions.map((opt) => opt.key)}
        colors={chartOptions.map((opt) => opt.color)}
        title="Motor 차트"
      />
    </Section>
  );
}

export default MotorPage;
