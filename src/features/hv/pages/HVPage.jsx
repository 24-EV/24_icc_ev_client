import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import Chart from '../../../components/chart/Chart';
import DataCard from '../../../components/common/DataCard';
import PageHeader from '../../../components/layout/PageHeader';
import styles from '../styles/HVPage.module.css';
import useHistory from '../../../hooks/useHistory';
import useDarkMode from '../../../hooks/useDarkMode';
import PageLayout from '../../../components/layout/PageLayout';
import commonStyles from '../../../styles/layout/PageLayout.module.css';
import Section from '../../../components/common/Section';

function HVPage() {
  const { history } = useHistory();
  const hvHistory = history.map((h) => h.hv);
  const latest = hvHistory[hvHistory.length - 1];

  if (!latest || Object.keys(latest).length === 0) {
    return (
      <Section>
        <PageHeader title="HV" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <PageLayout
      header={<PageHeader title="HV" />}
      data={latest}
      mainPanel={
        <div>
          <div>
            <Chart dataKey={'hv'} title="HV 차트 L" side="L" />
            <Chart dataKey={'hv'} title="HV 차트 R" side="R" />
          </div>
        </div>
      }
    />
  );
}

export default HVPage;
