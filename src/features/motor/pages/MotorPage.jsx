import React from 'react';
import Chart from '../../../components/chart/Chart';
import DataCard from '../../../components/common/DataCard';
import PageHeader from '../../../components/layout/PageHeader';
import useHistory from '../../../hooks/useHistory';
import useDarkMode from '../../../hooks/useDarkMode';
import PageLayout from '../../../components/layout/PageLayout';
import commonStyles from '../../../styles/layout/PageLayout.module.css';
import Section from '../../../components/common/Section';

function MotorPage() {
  const { history } = useHistory();
  const motorHistory = history.map((h) => h.motor);
  const latest = motorHistory[motorHistory.length - 1];

  if (!latest || Object.keys(latest).length === 0) {
    return (
      <Section>
        <PageHeader title="모터" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <PageLayout
      header={<PageHeader title="모터" />}
      data={latest}
      mainPanel={
        <div>
          <div>
            <Chart dataKey={'motor'} title="Motor 차트 L" side="L" />
            <Chart dataKey={'motor'} title="Motor 차트 R" side="R" />
          </div>
        </div>
      }
    />
  );
}

export default MotorPage;
