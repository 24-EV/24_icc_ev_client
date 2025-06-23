import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import hvStyles from '../styles/HVPageStyle'; // HV 전용 스타일 불러오기
import Chart from '../components/Chart';
import DataCard from '../components/common/DataCard';

function HVPage() {
  const { hvData } = useContext(SocketContext);

  if (!hvData) {
    return <div style={hvStyles.noData}>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <div>
        <DataCard label="전압" value={hvData.voltage} unit="V" />
      </div>
      <div>
        <DataCard label="전류" value={hvData.current} unit="A" />
      </div>
      <div>
        <DataCard label="배터리 잔량" value={hvData.battery_percent} unit="%" />
      </div>
      <div>
        <Chart
          data={hvData}
          dataKeys={['voltage', 'current', 'battery_percent']}
          colors={['purple', 'orange', 'cyan']}
          title="HV 차트"
        />
      </div>
    </div>
  );
}

export default HVPage;
