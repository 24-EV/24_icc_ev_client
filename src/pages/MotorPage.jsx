import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';

function MotorPage() {
  const { motorData } = useContext(SocketContext);

  if (!motorData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1>Motor</h1>
      <div>
        <DataCard label="Throttle" value={motorData.throttle} unit="/ 255" />
      </div>
      <div>
        <DataCard label="RPM" value={motorData.rpm} unit="RPM" />
      </div>
      <div>
        <DataCard label="컨트롤러 온도" value={motorData.controller_temperature} unit="℃" />
      </div>
      <div>
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
