import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import Chart from '../../../components/chart/Chart';
import DataCard from '../../../components/common/DataCard';
import PageHeader from '../../../components/layout/PageHeader';
import styles from '../styles/VehiclePage.module.css';
import useHistory from '../../../hooks/useHistory';
import useDarkMode from '../../../hooks/useDarkMode';
import PageLayout from '../../../components/layout/PageLayout';
import commonStyles from '../../../styles/layout/PageLayout.module.css';
import Section from '../../../components/common/Section';

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

  const dataCardItems = [
    {
      key: 'velocity',
      label: '속력',
      value: vehicleHistory[vehicleHistory.length - 1].velocity,
      unit: 'km/h'
    },
    {
      key: 'rtc',
      label: 'RTC Module',
      value: realTimeClock?.timestamp,
      unit: ''
    }
  ];

  return (
    <PageLayout
      header={<PageHeader title="차량" />}
      dataCards={dataCardItems.map((item) => (
        <DataCard key={item.key} label={item.label} value={item.value} unit={item.unit} />
      ))}
      mainPanel={
        <Chart data={vehicleHistory} dataKeys={['velocity']} colors={colors} title="속도 차트" />
      }
      topRowClass={commonStyles.topRow}
      titleWrapClass={commonStyles.titleWrap}
      dataCardRowClass={commonStyles.dataCardRow}
      panelRowClass={commonStyles.panelRow}
    />
  );
}

export default VehiclePage;
