import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import DataCard from '../components/common/DataCard';

function TestPage() {
  const { vehicleData } = useContext(SocketContext);
  const { hvData } = useContext(SocketContext);
  const { motorData } = useContext(SocketContext);
  const { realTimeClock } = useContext(SocketContext);

  if (!motorData) {
    return (
      <Section>
        <PageHeader title="테스트" />
        <div>데이터가 없습니다.</div>
      </Section>
    );
  }

  return (
    <Section>
      <PageHeader title="테스트" />
      <DataCard label="속력" value={vehicleData.velocity} unit="km/h" />
      <DataCard label="RTC Module" value={realTimeClock.timestamp} unit="" />
      <DataCard label="전압" value={hvData.voltage} unit="V" />
      <DataCard label="전류" value={hvData.current} unit="A" />
      <DataCard label="배터리 잔량" value={hvData.battery_percent} unit="%" />
      <DataCard label="Throttle" value={motorData.throttle} unit="/ 255" />
      <DataCard label="RPM" value={motorData.rpm} unit="RPM" />
      <DataCard label="컨트롤러 온도" value={motorData.controller_temperature} unit="℃" />
    </Section>
  );
}

export default TestPage;
