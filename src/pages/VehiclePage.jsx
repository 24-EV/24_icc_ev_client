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

  // 기존 색상만 사용
  const colors = ['#a259ec'];

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
      <div className={styles.topRow}>
        <div className={styles.titleWrap}>
          <PageHeader title="차량" />
        </div>
        <div className={styles.dataCardRow}>
          <DataCard
            label="속력"
            value={vehicleHistory[vehicleHistory.length - 1].velocity}
            unit="km/h"
          />
          <DataCard label="RTC Module" value={realTimeClock?.timestamp} unit="" />
        </div>
      </div>
      <div className={styles.panelRow}>
        <Chart
          key={isDark ? 'dark' : 'light'}
          data={vehicleHistory}
          dataKeys={['velocity']}
          colors={colors}
          title="속도 차트"
        />
      </div>
      <div className={styles.dataCardRow} data-single></div>
    </Section>
  );
}

export default VehiclePage;
