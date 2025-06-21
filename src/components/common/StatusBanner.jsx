import React from 'react';

function StatusBanner({ type, message }) {
  const colorMap = {
    loading: '#2196f3',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
  };
  return (
    <div
      style={{
        background: colorMap[type] || '#2196f3',
        color: '#fff',
        padding: '6px',
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      {message}
    </div>
  );
}

export default StatusBanner;
