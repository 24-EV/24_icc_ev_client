import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';

function VehiclePage() {
  const { vehicleData } = useContext(SocketContext);
  const { realTimeClock } = useContext(SocketContext);

  if (!vehicleData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <div>
        <DataCard label="속력" value={vehicleData.velocity} unit="km/h" />
      </div>
      <div>
        <Chart
          data={vehicleData}
          dataKeys={['velocity']}
          colors={['cornflowerblue']}
          title="속도 차트"
        />
      </div>
      <div>
        <DataCard label="RTC Module" value={realTimeClock?.timestamp} unit="" />
      </div>
    </div>
  );
}

export default VehiclePage;
