import React, { useState } from 'react';
import formatToExcelFile from '../utils/formatToExcelFile';
import SpinnerWhenLoading from './SpinnerWhenLoading';
import styles from '../styles/DownloadExcelForm.module.css';
import cardPanelStyles from '../styles/CardPanel.module.css';

function DownloadExcelForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await formatToExcelFile(startDate, endDate);
    } catch (err) {
      // 에러 핸들링(알림 등)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`${styles.formWrap} ${cardPanelStyles.drawerCardPanel}`}
      onSubmit={handleDownload}
    >
      <div className={styles.title}>Excel 데이터 다운로드</div>
      <div className={styles.inputRow}>
        <div className={styles.inputCol}>
          <div className={styles.label}>시작 날짜:</div>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputCol}>
          <div className={styles.label}>종료 날짜:</div>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      {loading ? (
        <SpinnerWhenLoading />
      ) : (
        <button type="submit" className={styles.button}>
          Excel 다운로드
        </button>
      )}
    </form>
  );
}

export default DownloadExcelForm;
