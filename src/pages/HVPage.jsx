import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/HVPage.module.css';

function HVPage() {
  const { hvData } = useContext(SocketContext);

  if (!hvData) {
    return (
      <Section>
        <PageHeader title="HV" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <Section>
      <PageHeader title="HV" />
      <div className={styles.cardGrid}>
        <DataCard label="전압" value={hvData.voltage} unit="V" />
        <DataCard label="전류" value={hvData.current} unit="A" />
        <DataCard label="배터리 잔량" value={hvData.battery_percent} unit="%" />
      </div>
      <Chart
        data={hvData}
        dataKeys={['voltage', 'current', 'battery_percent']}
        colors={['var(--color-primary)', 'var(--color-primary-light)', 'var(--color-primary-dark)']}
        title="HV 차트"
      />
    </Section>
  );
}

export default HVPage;
