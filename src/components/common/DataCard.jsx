import React from 'react';
import styles from '../../styles/DataCard.module.css';

function DataCard({ label, value, unit }) {
  return (
    <div className={styles.dataCard}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {value !== null && value !== undefined ? `${value} ${unit}` : '수신 실패'}
      </div>
    </div>
  );
}

export default DataCard;
