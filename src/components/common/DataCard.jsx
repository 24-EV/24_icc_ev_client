import React from 'react';
import styles from '../../styles/common/DataCard.module.css';

function DataCard({ label, value, unit }) {
  let displayValue;

  if (value && typeof value === 'object' && ('L' in value || 'R' in value)) {
    // value가 {L, R} 형태인 경우
    displayValue = (
      <div className={styles.lrContainer}>
        <span className={styles.leftValue}>
          {value.L !== null && value.L !== undefined ? `${value.L} ${unit}` : '-'}
        </span>
        <span className={styles.rightValue}>
          {value.R !== null && value.R !== undefined ? `${value.R} ${unit}` : '-'}
        </span>
      </div>
    );
  } else {
    // 일반 숫자
    displayValue = value !== null && value !== undefined ? `${value} ${unit}` : '수신 실패';
  }

  return (
    <div className={styles.dataCard}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{displayValue}</div>
    </div>
  );
}

export default DataCard;
