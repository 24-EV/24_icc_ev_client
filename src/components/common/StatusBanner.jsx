import React from 'react';

function StatusBanner({ type, message }) {
  const colorMap = {
    loading: '#2196f3',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
  };
  return (
    <div>
      {message}
    </div>
  );
}

export default StatusBanner;
