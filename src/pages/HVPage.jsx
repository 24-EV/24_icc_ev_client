import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/HVPage.module.css';
import useHistory from '../hooks/useHistory';
import useDarkMode from '../hooks/useDarkMode';
import PageLayout from '../components/common/PageLayout';
import commonStyles from '../styles/CommonLayout.module.css';

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

  const dataCardItems = [
    {
      key: 'voltage',
      label: '전압',
      value: hvHistory[hvHistory.length - 1].voltage,
      unit: 'V'
    },
    {
      key: 'current',
      label: '전류',
      value: hvHistory[hvHistory.length - 1].current,
      unit: 'A'
    },
    {
      key: 'battery',
      label: '배터리 잔량',
      value: hvHistory[hvHistory.length - 1].battery_percent,
      unit: '%'
    }
  ];

  return (
    <PageLayout
      header={<PageHeader title="HV" />}
      dataCards={dataCardItems.map((item) => (
        <DataCard key={item.key} label={item.label} value={item.value} unit={item.unit} />
      ))}
      mainPanel={
        <Chart
          data={hvHistory}
          dataKeys={['voltage', 'current', 'battery_percent']}
          colors={colors}
          title="HV 차트"
        />
      }
      topRowClass={commonStyles.topRow}
      titleWrapClass={commonStyles.titleWrap}
      dataCardRowClass={commonStyles.dataCardRow}
      panelRowClass={commonStyles.panelRow}
    />
  );
}

export default HVPage;
