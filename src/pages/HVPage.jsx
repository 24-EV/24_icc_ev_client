import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/HVPage.module.css';
import useHistory from '../hooks/useHistory';
import useDarkMode from '../hooks/useDarkMode';

function HVPage() {
  const { history } = useHistory();
  const hvHistory = history.map((h) => h.hvData);
  const [isDark] = useDarkMode();

  // 기존 색상만 사용
  const colors = ['#a259ec', '#b388ff', '#7c3aed'];

  if (!hvHistory.length) {
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
        <DataCard label="전압" value={hvHistory[hvHistory.length - 1].voltage} unit="V" />
        <DataCard label="전류" value={hvHistory[hvHistory.length - 1].current} unit="A" />
        <DataCard
          label="배터리 잔량"
          value={hvHistory[hvHistory.length - 1].battery_percent}
          unit="%"
        />
      </div>
      <Chart
        key={isDark ? 'dark' : 'light'}
        data={hvHistory}
        dataKeys={['voltage', 'current', 'battery_percent']}
        colors={colors}
        title="HV 차트"
      />
    </Section>
  );
}

export default HVPage;
