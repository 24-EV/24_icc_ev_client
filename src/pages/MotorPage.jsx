import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import motorStyles from '../styles/MotorPageStyle';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';

function MotorPage() {
  const { motorData } = useContext(SocketContext);

  if (!motorData) {
    return <div style={motorStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={motorStyles.container}>
      <h1 style={motorStyles.title}>Motor</h1>
      <div style={motorStyles.dataContainer}>
        <DataCard label="Throttle" value={motorData.throttle} unit="/ 255" />
      </div>
      <div style={motorStyles.dataContainer}>
        <DataCard label="RPM" value={motorData.rpm} unit="RPM" />
      </div>
      <div style={motorStyles.dataContainer}>
        <DataCard label="컨트롤러 온도" value={motorData.controller_temperature} unit="℃" />
      </div>
      <div style={motorStyles.chartContainer}>
        <Chart
          data={motorData}
          dataKeys={['throttle', 'rpm', 'controller_temperature']}
          colors={['cornflowerblue', 'green', 'tomato']}
          title="Motor 차트"
        />
      </div>
    </div>
  );
}

export default MotorPage;
