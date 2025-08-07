import React, { useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import Section from '../../../components/common/Section';
import PageHeader from '../../../components/layout/PageHeader';
import { useSocketData } from '../../../hooks/useSocketData';
import PageLayout, { DataCards } from '../../../components/layout/PageLayout';

function DashboardPage() {
  const { totalData } = useSocketData(SocketContext);

  if (!totalData) {
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
      mainPanel={Object.entries(totalData)
        .filter(([key]) => key !== 'timestamp')
        .map(([groupKey]) => (
          <DataCards
            header={<PageHeader title={`${partsKeyName[groupKey]}`} />}
            data={totalData[groupKey]}
          />
        ))}
    ></PageLayout>
  );
}

export default DashboardPage;
