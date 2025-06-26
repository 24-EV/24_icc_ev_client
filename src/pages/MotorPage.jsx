import React from 'react';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/MotorPage.module.css';
import useHistory from '../hooks/useHistory';
import useDarkMode from '../hooks/useDarkMode';

const chartOptions = [
  { key: 'throttle', color: '#a259ec' },
  { key: 'rpm', color: '#b388ff' },
  { key: 'controller_temperature', color: '#7c3aed' }
];

const colors = ['#a259ec', '#b388ff', '#7c3aed'];

function MotorPage() {
  const { history } = useHistory();
  const motorHistory = history.map((h) => h.motorData);
  const latest = motorHistory[motorHistory.length - 1];
  const [isDark] = useDarkMode();

  if (!motorHistory.length) {
    return (
      <Section>
        <PageHeader title="모터" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <Section>
      <div className={styles.topRow}>
        <div className={styles.titleWrap}>
          <PageHeader title="모터" />
        </div>
        <div className={styles.dataCardRow}>
          <DataCard label="Throttle" value={latest?.throttle} unit="/ 255" />
          <DataCard label="RPM" value={latest?.rpm} unit="RPM" />
          <DataCard label="컨트롤러 온도" value={latest?.controller_temperature} unit="℃" />
        </div>
      </div>
      <div className={styles.panelRow}>
        <Chart
          key={isDark ? 'dark' : 'light'}
          data={motorHistory}
          dataKeys={chartOptions.map((opt) => opt.key)}
          colors={colors}
          title="Motor 차트"
        />
      </div>
    </Section>
  );
}

export default MotorPage;
