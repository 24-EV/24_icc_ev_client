import React from 'react';

function DataCard({ label, value, unit }) {
  return (
    <div>
      <div>{label}</div>
      <div>
        {value !== null ? `${value} ${unit}` : '수신 실패'}
      </div>
    </div>
  );
}

export default DataCard;
