import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import Chart from '../components/Chart';
import vehicleStyles from '../styles/VehiclePageStyle';
import DataCard from '../components/common/DataCard';

function VehiclePage() {
  const { vehicleData } = useContext(SocketContext);
  const { realTimeClock } = useContext(SocketContext);

  if (!vehicleData) {
    return <div style={vehicleStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div style={vehicleStyles.container}>
      <div style={vehicleStyles.dataContainer}>
        <DataCard label="속력" value={vehicleData.velocity} unit="km/h" />
      </div>
      <div style={vehicleStyles.chartContainer}>
        <Chart
          data={vehicleData}
          dataKeys={['velocity']}
          colors={['cornflowerblue']}
          title="속도 차트"
        />
      </div>
      <div style={vehicleStyles.dataContainer}>
        <DataCard label="RTC Module" value={realTimeClock?.timestamp} unit="" />
      </div>
    </div>
  );
}

export default VehiclePage;
