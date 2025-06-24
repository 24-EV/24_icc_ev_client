import React from 'react';
import styles from '../../styles/StatusBanner.module.css';

const iconMap = {
  loading: <span style={{ fontSize: 18 }}>⏳</span>,
  error: <span style={{ fontSize: 18 }}>❌</span>,
  warning: <span style={{ fontSize: 18 }}>⚠️</span>,
  success: <span style={{ fontSize: 18 }}>✅</span>,
};

function StatusBanner({ type = 'loading', message }) {
  const typeClass =
    type === 'success'
      ? styles.statusBannerSuccess
      : type === 'error'
        ? styles.statusBannerError
        : type === 'warning'
          ? styles.statusBannerWarning
          : styles.statusBannerLoading;
  return (
    <div className={`${styles.statusBanner} ${typeClass}`}>
      {iconMap[type]}
      <span>{message}</span>
    </div>
  );
}

export default StatusBanner;
