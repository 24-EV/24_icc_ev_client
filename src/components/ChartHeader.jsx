import React from 'react';
import ToggleSwitch from '../components/common/ToggleSwitch';

function ChartHeader({ title, autoScroll, setAutoScroll, styles }) {
  return (
    <div className={styles.chartHeader}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <div className={styles.toggleWrap}>
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
