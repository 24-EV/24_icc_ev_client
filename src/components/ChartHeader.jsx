import React from 'react';

function ChartHeader({ title, autoScroll, setAutoScroll, styles }) {
  return (
    <div className={styles.chartHeader}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <div className={styles.toggleWrap}>
        <span className={styles.toggleLabel}>스크롤 잠금</span>
        {/* 커스텀 토글 스위치 */}
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className={styles.toggleInput}
          />
          <span className={styles.toggleTrack} data-checked={autoScroll}>
            <span className={styles.toggleThumb} data-checked={autoScroll} />
          </span>
        </label>
      </div>
    </div>
  );
}

export default ChartHeader;
