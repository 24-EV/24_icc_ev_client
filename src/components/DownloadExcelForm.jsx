import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/DownloadExcelForm.module.css';

function DownloadExcelComponent() {
  const [startDate, setStartDate] = useState(''); // 시작 날짜 상태
  const [endDate, setEndDate] = useState(''); // 종료 날짜 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 실제 다운로드 로직
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formWrap} onSubmit={handleDownload}>
      <div className={styles.title}>Excel 데이터 다운로드</div>
      <div className={styles.inputRow}>
        <div style={{ flex: 1 }}>
          <div className={styles.label}>시작 날짜:</div>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div className={styles.label}>종료 날짜:</div>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? '다운로드 중...' : 'Excel 다운로드'}
      </button>
    </form>
  );
}

export default DownloadExcelComponent;
