import React, { useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import Section from '../../../components/common/Section';
import PageHeader from '../../../components/layout/PageHeader';
import { useSocketData } from '../../../hooks/useSocketData';
import PageLayout, { DataCards } from '../../../components/layout/PageLayout';
import useHistory from '../../../hooks/useHistory';

function DashboardPage() {
  const { history } = useHistory();
  const latest = { ...history[history.length - 1] };

  if (!latest || Object.keys(latest).length === 0) {
    return (
      <Section>
        <PageHeader title="대시보드" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  const partsKeyName = { vehicle: '차량', hv: 'HV', motor: '모터', gps: 'GPS' };

  return (
    <PageLayout
      header={<PageHeader title={'대시보드'} />}
      mainPanel={Object.entries(latest)
        .filter(([key]) => key !== 'timestamp')
        .map(([groupKey]) => (
          <DataCards
            header={<PageHeader title={`${partsKeyName[groupKey]}`} />}
            data={latest[groupKey]}
          />
        ))}
    ></PageLayout>
  );
}

export default DashboardPage;
