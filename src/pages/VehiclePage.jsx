import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/VehiclePage.module.css';
import useHistory from '../hooks/useHistory';
import useDarkMode from '../hooks/useDarkMode';

function VehiclePage() {
  const { history } = useHistory();
  const vehicleHistory = history.map((h) => h.vehicleData);
  const { realTimeClock } = useContext(SocketContext);
  const [isDark] = useDarkMode();

  if (!vehicleHistory.length) {
    return (
      <Section>
        <PageHeader title="차량" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <Section>
      <PageHeader title="차량" />
      <div className={styles.cardGrid}>
        <DataCard
          label="속력"
          value={vehicleHistory[vehicleHistory.length - 1].velocity}
          unit="km/h"
        />
      </div>
      <div className={styles.chartWrap}>
        <Chart
          key={isDark ? 'dark' : 'light'}
          data={vehicleHistory}
          dataKeys={['velocity']}
          colors={['#a259ec']}
          title="속도 차트"
        />
      </div>
      <div className={styles.cardGrid}>
        <DataCard label="RTC Module" value={realTimeClock?.timestamp} unit="" />
      </div>
    </Section>
  );
}

export default VehiclePage;
