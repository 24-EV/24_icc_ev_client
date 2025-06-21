import React from 'react';

function DataCard({ label, value, unit }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        padding: 16,
        margin: 8,
        minWidth: 120,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 16, color: '#555' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>
        {value !== null ? `${value} ${unit}` : '수신 실패'}
      </div>
    </div>
  );
}

export default DataCard;
