import React from 'react';
import ToggleSwitch from '../components/common/ToggleSwitch';
import styles from '../styles/Chart.module.css';

function ChartHeader({ title, autoScroll, setAutoScroll }) {
  return (
    <div className={styles.chartHeader}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <div className={styles.buttonRow}>
        <ToggleSwitch
          checked={autoScroll}
          onChange={(e) => setAutoScroll(e.target.checked)}
          label="스크롤 잠금"
        />
      </div>
    </div>
  );
}

export default ChartHeader;
